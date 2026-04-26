import DBService from '../database/DBService.js';
/**
 * Base repository class with common database operations
 */
export class BaseRepository {
    tableName;
    constructor(tableName) {
        this.tableName = tableName;
    }
    /**
     * Find all records
     */
    async findAll() {
        const query = `SELECT * FROM ${this.tableName}`;
        return DBService.queryAll(query);
    }
    /**
     * Find a record by ID
     */
    async findById(id) {
        const query = `SELECT * FROM ${this.tableName} WHERE id = $1`;
        return DBService.queryOne(query, [id]);
    }
    /**
     * Find records by a condition
     */
    async findBy(column, value) {
        const query = `SELECT * FROM ${this.tableName} WHERE ${column} = $1`;
        return DBService.queryAll(query, [value]);
    }
    /**
     * Count all records
     */
    async count() {
        const query = `SELECT COUNT(*) as count FROM ${this.tableName}`;
        const result = await DBService.queryOne(query);
        return result ? parseInt(result.count, 10) : 0;
    }
    /**
     * Delete a record by ID
     */
    async deleteById(id) {
        const query = `DELETE FROM ${this.tableName} WHERE id = $1`;
        const result = await DBService.getInstance().result(query, [id]);
        return result.rowCount > 0;
    }
    /**
     * Raw query execution
     */
    async executeQuery(query, values) {
        return DBService.queryAll(query, values);
    }
    /**
     * Transaction support
     */
    async transaction(callback) {
        return DBService.transaction(callback);
    }
}
//# sourceMappingURL=BaseRepository.js.map