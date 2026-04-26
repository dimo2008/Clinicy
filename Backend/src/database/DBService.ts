import pgPromise from 'pg-promise';
import dotenv from 'dotenv';

dotenv.config();

interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
}

class DBService {
  private static instance: pgPromise.IDatabase<any>;
  private static pgp: any;

  /**
   * Initialize the database connection pool
   */
  static async initialize(): Promise<void> {
    try {
      const config: DatabaseConfig = {
        host: process.env.DB_HOST || "localhost",
        port: parseInt(process.env.DB_PORT || "5432"),
        database: process.env.DB_NAME || "clinicy_db",
        user: process.env.DB_USER || "postgres",
        password: process.env.DB_PASSWORD || "postgres123",
      };

      const pgp = pgPromise();
      this.pgp = pgp;

      // Connect to admin database to ensure target DB exists
      const adminCn = {
        host: config.host,
        port: config.port,
        database: "postgres",
        user: config.user,
        password: config.password,
      };

      const adminDb = pgp(adminCn);

      const exists = await adminDb.oneOrNone(
        "SELECT 1 FROM pg_database WHERE datname = $1",
        [config.database]
      );

      if (!exists) {
        console.log(`⚙️  Database '${config.database}' not found; creating...`);
        await adminDb.none(`CREATE DATABASE "${config.database}"`);
        console.log(`✅ Database '${config.database}' created`);
      } else {
        console.log(`ℹ️  Database '${config.database}' already exists`);
      }

      // Close admin connection
      await adminDb.$pool.end();

      // Connect to target database
      const targetCn = {
        host: config.host,
        port: config.port,
        database: config.database,
        user: config.user,
        password: config.password,
      };

      this.instance = pgp(targetCn);
      await this.instance.one('SELECT 1');

      console.log('✓ Database connection established successfully');
    } catch (error) {
      console.error('✗ Failed to connect to database:', error);
      throw error;
    }
  }

  /**
   * Get the database instance
   */
  static getInstance(): pgPromise.IDatabase<any> {
    if (!this.instance) {
      throw new Error('Database not initialized. Call DBService.initialize() first.');
    }
    return this.instance;
  }

  /**
   * Close the database connection
   */
  static async close(): Promise<void> {
    if (this.instance) {
      await this.instance.$pool.end();
      console.log('✓ Database connection closed');
    }
  }

  /**
   * Execute a raw query
   */
  static async query(query: string, values?: any[]): Promise<any[]> {
    return this.getInstance().query(query, values);
  }

  /**
   * Execute a query and return one result
   */
  static async queryOne(query: string, values?: any[]): Promise<any> {
    return this.getInstance().oneOrNone(query, values);
  }

  /**
   * Execute a query and return all results
   */
  static async queryAll(query: string, values?: any[]): Promise<any[]> {
    return this.getInstance().any(query, values);
  }

  /**
   * Execute multiple queries in a transaction
   */
  static async transaction<T>(callback: (t: any) => Promise<T>): Promise<T> {
    return this.getInstance().tx(callback);
  }
}

export default DBService;
