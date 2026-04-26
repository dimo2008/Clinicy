import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
async function createMigration(name) {
    // Get the next migration number
    const files = fs.readdirSync(__dirname)
        .filter(file => file.match(/^\d{3}_.*\.ts$/))
        .sort()
        .reverse();
    const lastFile = files[0];
    let nextNumber = 1;
    if (lastFile) {
        const match = lastFile.match(/^(\d{3})/);
        if (match && match[1]) {
            nextNumber = parseInt(match[1], 10) + 1;
        }
    }
    const paddedNumber = String(nextNumber).padStart(3, '0');
    const fileName = `${paddedNumber}_${name}.ts`;
    const filePath = path.join(__dirname, fileName);
    const template = `/**
 * ${fileName}
 * Migration - ${name}
 */

export const up = async (db: any) => {
  // Write your migration up logic here
  await db.none(\`
    -- Your SQL here
  \`);
};

export const down = async (db: any) => {
  // Write your migration down (rollback) logic here
  await db.none(\`
    -- Your rollback SQL here
  \`);
};

export const name = '${paddedNumber}_${name}';
`;
    fs.writeFileSync(filePath, template);
    console.log(`✅ Migration created: ${fileName}`);
    console.log(`📝 Location: ${filePath}`);
    console.log(`\n💡 Edit the migration file and add your SQL logic in the up and down functions.`);
}
const name = process.argv[2];
if (!name) {
    console.error('Usage: npm run migrate:create -- migration_name');
    console.error('Example: npm run migrate:create -- add_user_email_column');
    process.exit(1);
}
createMigration(name);
//# sourceMappingURL=createMigration.js.map