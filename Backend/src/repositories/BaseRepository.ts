import DBService from '../database/DBService.js';

/**
 * Base repository class with common database operations
 */
export abstract class BaseRepository<T> {
  protected tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  /**
   * Find all records
   */
  async findAll(): Promise<T[]> {
    const query = `SELECT * FROM ${this.tableName}`;
    return DBService.queryAll(query);
  }

  /**
   * Find a record by ID
   */
  async findById(id: number): Promise<T | null> {
    const query = `SELECT * FROM ${this.tableName} WHERE id = $1`;
    return DBService.queryOne(query, [id]);
  }

  /**
   * Find records by a condition
   */
  async findBy(column: string, value: any): Promise<T[]> {
    const query = `SELECT * FROM ${this.tableName} WHERE ${column} = $1`;
    return DBService.queryAll(query, [value]);
  }

  /**
   * Count all records
   */
  async count(): Promise<number> {
    const query = `SELECT COUNT(*) as count FROM ${this.tableName}`;
    const result = await DBService.queryOne(query);
    return result ? parseInt(result.count, 10) : 0;
  }

  /**
   * Delete a record by ID
   */
  async deleteById(id: number): Promise<boolean> {
    const query = `DELETE FROM ${this.tableName} WHERE id = $1`;
    const result = await DBService.getInstance().result(query, [id]);
    return result.rowCount > 0;
  }

  /**
   * Raw query execution
   */
  async executeQuery(query: string, values?: any[]): Promise<any[]> {
    return DBService.queryAll(query, values);
  }

  /**
   * Transaction support
   */
  protected async transaction<R>(callback: (t: any) => Promise<R>): Promise<R> {
    return DBService.transaction(callback);
  }
}
