import DBService from '../database/DBService.js';
import { BaseRepository } from './BaseRepository.js';

export interface IUser {
  id?: number;
  username: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
}

/**
 * User Repository - Handles all user database operations
 */
export class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super('users');
  }

  /**
   * Create a new user
   */
  async create(user: IUser): Promise<IUser> {
    const query = `
      INSERT INTO ${this.tableName} (username, password, created_at, updated_at)
      VALUES ($1, $2, NOW(), NOW())
      RETURNING *
    `;
    return DBService.queryOne(query, [user.username, user.password]);
  }

  /**
   * Find user by username
   */
  async findByUsername(username: string): Promise<IUser | null> {
    const query = `SELECT * FROM ${this.tableName} WHERE username = $1`;
    return DBService.queryOne(query, [username]);
  }

  /**
   * Update user password
   */
  async updatePassword(id: number, newPassword: string): Promise<IUser | null> {
    const query = `
      UPDATE ${this.tableName}
      SET password = $1, updated_at = NOW()
      WHERE id = $2
      RETURNING *
    `;
    return DBService.queryOne(query, [newPassword, id]);
  }

  /**
   * Update user
   */
  async update(id: number, user: Partial<IUser>): Promise<IUser | null> {
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (user.username !== undefined) {
      updates.push(`username = $${paramIndex}`);
      values.push(user.username);
      paramIndex++;
    }

    if (user.password !== undefined) {
      updates.push(`password = $${paramIndex}`);
      values.push(user.password);
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
   * Delete user by username
   */
  async deleteByUsername(username: string): Promise<boolean> {
    const query = `DELETE FROM ${this.tableName} WHERE username = $1`;
    const result = await DBService.getInstance().result(query, [username]);
    return result.rowCount > 0;
  }

  /**
   * Check if user exists
   */
  async exists(username: string): Promise<boolean> {
    const query = `SELECT EXISTS(SELECT 1 FROM ${this.tableName} WHERE username = $1)`;
    const result = await DBService.queryOne(query, [username]);
    return result?.exists || false;
  }
}
