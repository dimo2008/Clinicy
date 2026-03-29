import DBService from '../DBService.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface Migration {
  up: (db: any) => Promise<void>;
  down: (db: any) => Promise<void>;
  name: string;
}

async function getAllMigrations(): Promise<Migration[]> {
  const migrationsPath = __dirname;
  const files = fs.readdirSync(migrationsPath)
    .filter(file => file.match(/^\d{3}_.*\.ts$/) && !file.includes('runner') && !file.includes('createMigration'))
    .sort();

  const migrations: Migration[] = [];

  for (const file of files) {
    try {
      const module = await import(`./${file}`);
      migrations.push({
        up: module.up,
        down: module.down,
        name: module.name || file.replace('.ts', ''),
      });
    } catch (error) {
      console.error(`Error loading migration ${file}:`, error);
    }
  }

  return migrations;
}

async function ensureMigrationsTable(db: any): Promise<void> {
  await db.none(`
    CREATE TABLE IF NOT EXISTS migrations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      run_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

async function getRanMigrations(db: any): Promise<string[]> {
  await ensureMigrationsTable(db);
  const result = await db.any('SELECT name FROM migrations ORDER BY name');
  return result.map((r: any) => r.name);
}

async function markMigrationAsRun(db: any, migrationName: string): Promise<void> {
  await db.none(
    'INSERT INTO migrations (name) VALUES ($1)',
    [migrationName]
  );
}

async function markMigrationAsRolledBack(db: any, migrationName: string): Promise<void> {
  await db.none(
    'DELETE FROM migrations WHERE name = $1',
    [migrationName]
  );
}

async function runMigrations(direction: 'up' | 'down' = 'up'): Promise<void> {
  try {
    await DBService.initialize();

    const db = DBService.getInstance();
    const migrations = await getAllMigrations();
    const ranMigrations = await getRanMigrations(db);

    if (direction === 'up') {
      console.log('\n🔄 Running migrations...\n');

      for (const migration of migrations) {
        if (!ranMigrations.includes(migration.name)) {
          try {
            console.log(`⏳ Running: ${migration.name}`);
            await migration.up(db);
            await markMigrationAsRun(db, migration.name);
            console.log(`✅ Completed: ${migration.name}\n`);
          } catch (error) {
            console.error(`❌ Failed: ${migration.name}`);
            console.error(error);
            throw error;
          }
        } else {
          console.log(`⏭️  Already run: ${migration.name}\n`);
        }
      }

      console.log('✓ All migrations completed successfully!\n');
    } else {
      console.log('\n🔄 Rolling back migrations...\n');

      const ranMigrationList = ranMigrations.filter(name =>
        migrations.some(m => m.name === name)
      ).reverse();

      for (const migrationName of ranMigrationList) {
        const migration = migrations.find(m => m.name === migrationName);
        if (migration) {
          try {
            console.log(`⏳ Rolling back: ${migration.name}`);
            await migration.down(db);
            await markMigrationAsRolledBack(db, migration.name);
            console.log(`✅ Rolled back: ${migration.name}\n`);
          } catch (error) {
            console.error(`❌ Failed to rollback: ${migration.name}`);
            console.error(error);
            throw error;
          }
        }
      }

      console.log('✓ All migrations rolled back successfully!\n');
    }

    await DBService.close();
  } catch (error) {
    console.error('Migration failed:', error);
    await DBService.close();
    process.exit(1);
  }
}

// Check for command line arguments
const args = process.argv.slice(2);
const direction = args[0] === 'down' ? 'down' : 'up';

runMigrations(direction);
