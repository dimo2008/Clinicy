/**
 * 002_create_patients_table.ts
 * Migration - Create patients table
 */

export const up = async (db: any) => {
  await db.none(`
    CREATE TABLE IF NOT EXISTS patients (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      age INTEGER,
      email VARCHAR(255) UNIQUE,
      phone VARCHAR(20),
      address TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_patients_name ON patients(name);
    CREATE INDEX IF NOT EXISTS idx_patients_email ON patients(email);
    CREATE INDEX IF NOT EXISTS idx_patients_age ON patients(age);
    CREATE INDEX IF NOT EXISTS idx_patients_created_at ON patients(created_at);
  `);
};

export const down = async (db: any) => {
  await db.none(`
    DROP INDEX IF EXISTS idx_patients_created_at;
    DROP INDEX IF EXISTS idx_patients_age;
    DROP INDEX IF EXISTS idx_patients_email;
    DROP INDEX IF EXISTS idx_patients_name;
    DROP TABLE IF EXISTS patients;
  `);
};

export const name = '002_create_patients_table';
