/**
 * 001_create_users_table.ts
 * Initial migration - Create users table
 */
export const up = async (db) => {
    await db.none(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
    CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);
  `);
};
export const down = async (db) => {
    await db.none(`
    DROP INDEX IF EXISTS idx_users_created_at;
    DROP INDEX IF EXISTS idx_users_username;
    DROP TABLE IF EXISTS users;
  `);
};
export const name = '001_create_users_table';
//# sourceMappingURL=001_create_users_table.js.map