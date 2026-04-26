/**
 * Base repository class with common database operations
 */
export declare abstract class BaseRepository<T> {
    protected tableName: string;
    constructor(tableName: string);
    /**
     * Find all records
     */
    findAll(): Promise<T[]>;
    /**
     * Find a record by ID
     */
    findById(id: number): Promise<T | null>;
    /**
     * Find records by a condition
     */
    findBy(column: string, value: any): Promise<T[]>;
    /**
     * Count all records
     */
    count(): Promise<number>;
    /**
     * Delete a record by ID
     */
    deleteById(id: number): Promise<boolean>;
    /**
     * Raw query execution
     */
    executeQuery(query: string, values?: any[]): Promise<any[]>;
    /**
     * Transaction support
     */
    protected transaction<R>(callback: (t: any) => Promise<R>): Promise<R>;
}
//# sourceMappingURL=BaseRepository.d.ts.map