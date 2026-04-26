/**
 * 003_create_files_table.ts
 * Migration - Create files table
 */

export const up = async (db: any) => {
  await db.none(`
    CREATE TABLE IF NOT EXISTS files (
      id SERIAL PRIMARY KEY,
      filename VARCHAR(255) NOT NULL,
      filepath VARCHAR(255) NOT NULL,
      size BIGINT,
      mime_type VARCHAR(100),
      uploaded_by INTEGER,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP,
      FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL
    );

    CREATE INDEX IF NOT EXISTS idx_files_filename ON files(filename);
    CREATE INDEX IF NOT EXISTS idx_files_uploaded_by ON files(uploaded_by);
    CREATE INDEX IF NOT EXISTS idx_files_mime_type ON files(mime_type);
    CREATE INDEX IF NOT EXISTS idx_files_created_at ON files(created_at);
  `);
};

export const down = async (db: any) => {
  await db.none(`
    DROP INDEX IF EXISTS idx_files_created_at;
    DROP INDEX IF EXISTS idx_files_mime_type;
    DROP INDEX IF EXISTS idx_files_uploaded_by;
    DROP INDEX IF EXISTS idx_files_filename;
    DROP TABLE IF EXISTS files;
  `);
};

export const name = '003_create_files_table';
