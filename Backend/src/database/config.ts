import dotenv from 'dotenv';

dotenv.config();

export const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  database: process.env.DB_NAME || 'clinicy_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  poolSize: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

export const migrationsDir = process.env.MIGRATIONS_DIR || 'src/database/migrations';
