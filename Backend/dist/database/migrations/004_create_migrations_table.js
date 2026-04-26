/**
 * 004_create_migrations_table.ts
 * Migration - Create migrations tracking table
 */
export const up = async (db) => {
    await db.none(`
    CREATE TABLE IF NOT EXISTS migrations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      run_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
};
export const down = async (db) => {
    await db.none(`
    DROP TABLE IF EXISTS migrations;
  `);
};
export const name = '004_create_migrations_table';
//# sourceMappingURL=004_create_migrations_table.js.map