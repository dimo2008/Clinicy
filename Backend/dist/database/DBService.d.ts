import pgPromise from 'pg-promise';
declare class DBService {
    private static instance;
    private static pgp;
    /**
     * Initialize the database connection pool
     */
    static initialize(): Promise<void>;
    /**
     * Get the database instance
     */
    static getInstance(): pgPromise.IDatabase<any>;
    /**
     * Close the database connection
     */
    static close(): Promise<void>;
    /**
     * Execute a raw query
     */
    static query(query: string, values?: any[]): Promise<any[]>;
    /**
     * Execute a query and return one result
     */
    static queryOne(query: string, values?: any[]): Promise<any>;
    /**
     * Execute a query and return all results
     */
    static queryAll(query: string, values?: any[]): Promise<any[]>;
    /**
     * Execute multiple queries in a transaction
     */
    static transaction<T>(callback: (t: any) => Promise<T>): Promise<T>;
}
export default DBService;
//# sourceMappingURL=DBService.d.ts.map