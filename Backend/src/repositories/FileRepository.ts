import DBService from '../database/DBService.js';
import { BaseRepository } from './BaseRepository.js';

export interface IFile {
  id?: number;
  filename: string;
  filepath: string;
  size: number;
  mime_type?: string;
  uploaded_by?: number;
  created_at?: Date;
  updated_at?: Date;
}

/**
 * File Repository - Handles all file database operations
 */
export class FileRepository extends BaseRepository<IFile> {
  constructor() {
    super('files');
  }

  /**
   * Create a new file record
   */
  async create(file: IFile): Promise<IFile> {
    const query = `
      INSERT INTO ${this.tableName} (filename, filepath, size, mime_type, uploaded_by, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
      RETURNING *
    `;
    return DBService.queryOne(query, [
      file.filename,
      file.filepath,
      file.size,
      file.mime_type || null,
      file.uploaded_by || null,
    ]);
  }

  /**
   * Update file record
   */
  async update(id: number, file: Partial<IFile>): Promise<IFile | null> {
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (file.filename !== undefined) {
      updates.push(`filename = $${paramIndex}`);
      values.push(file.filename);
      paramIndex++;
    }

    if (file.size !== undefined) {
      updates.push(`size = $${paramIndex}`);
      values.push(file.size);
      paramIndex++;
    }

    if (file.mime_type !== undefined) {
      updates.push(`mime_type = $${paramIndex}`);
      values.push(file.mime_type || null);
      paramIndex++;
    }

    if (updates.length === 0) {
      return this.findById(id);
    }

    updates.push(`updated_at = NOW()`);
    values.push(id);

    const query = `
      UPDATE ${this.tableName}
      SET ${updates.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING *
    `;

    return DBService.queryOne(query, values);
  }

  /**
   * Find files by filename
   */
  async findByFilename(filename: string): Promise<IFile[]> {
    const query = `
      SELECT * FROM ${this.tableName}
      WHERE LOWER(filename) LIKE LOWER($1)
      ORDER BY created_at DESC
    `;
    return DBService.queryAll(query, [`%${filename}%`]);
  }

  /**
   * Get files uploaded by a user
   */
  async findByUploadedBy(userId: number): Promise<IFile[]> {
    const query = `
      SELECT * FROM ${this.tableName}
      WHERE uploaded_by = $1
      ORDER BY created_at DESC
    `;
    return DBService.queryAll(query, [userId]);
  }

  /**
   * Get recent files
   */
  async getRecent(limit: number = 10): Promise<IFile[]> {
    const query = `
      SELECT * FROM ${this.tableName}
      ORDER BY created_at DESC
      LIMIT $1
    `;
    return DBService.queryAll(query, [limit]);
  }

  /**
   * Find by mime type
   */
  async findByMimeType(mimeType: string): Promise<IFile[]> {
    const query = `
      SELECT * FROM ${this.tableName}
      WHERE mime_type = $1
      ORDER BY created_at DESC
    `;
    return DBService.queryAll(query, [mimeType]);
  }

  /**
   * Get total file size for a user
   */
  async getTotalSizeByUser(userId: number): Promise<number> {
    const query = `
      SELECT COALESCE(SUM(size), 0) as total_size
      FROM ${this.tableName}
      WHERE uploaded_by = $1
    `;
    const result = await DBService.queryOne(query, [userId]);
    return result?.total_size || 0;
  }
}
