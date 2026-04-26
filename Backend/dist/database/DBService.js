import pgPromise from 'pg-promise';
import dotenv from 'dotenv';
dotenv.config();
class DBService {
    static instance;
    static pgp;
    /**
     * Initialize the database connection pool
     */
    static async initialize() {
        try {
            const config = {
                host: process.env.DB_HOST || 'localhost',
                port: parseInt(process.env.DB_PORT || '5432'),
                database: process.env.DB_NAME || 'clinicy_db',
                user: process.env.DB_USER || 'postgres',
                password: process.env.DB_PASSWORD || 'postgres',
            };
            const pgp = pgPromise();
            this.pgp = pgp;
            const cn = {
                host: config.host,
                port: config.port,
                database: config.database,
                user: config.user,
                password: config.password,
            };
            this.instance = pgp(cn);
            // Test the connection
            await this.instance.one('SELECT 1');
            console.log('✓ Database connection established successfully');
        }
        catch (error) {
            console.error('✗ Failed to connect to database:', error);
            throw error;
        }
    }
    /**
     * Get the database instance
     */
    static getInstance() {
        if (!this.instance) {
            throw new Error('Database not initialized. Call DBService.initialize() first.');
        }
        return this.instance;
    }
    /**
     * Close the database connection
     */
    static async close() {
        if (this.instance) {
            await this.instance.$pool.end();
            console.log('✓ Database connection closed');
        }
    }
    /**
     * Execute a raw query
     */
    static async query(query, values) {
        return this.getInstance().query(query, values);
    }
    /**
     * Execute a query and return one result
     */
    static async queryOne(query, values) {
        return this.getInstance().oneOrNone(query, values);
    }
    /**
     * Execute a query and return all results
     */
    static async queryAll(query, values) {
        return this.getInstance().any(query, values);
    }
    /**
     * Execute multiple queries in a transaction
     */
    static async transaction(callback) {
        return this.getInstance().tx(callback);
    }
}
export default DBService;
//# sourceMappingURL=DBService.js.map