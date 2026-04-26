# PostgreSQL Database Setup Guide

This guide covers how to set up PostgreSQL for the Clinicy project and integrate it with the Node.js backend.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Creating the Database](#creating-the-database)
- [Environment Configuration](#environment-configuration)
- [Running Migrations](#running-migrations)
- [Connection Verification](#connection-verification)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

- PostgreSQL 12 or higher installed
- Node.js 18+ installed
- npm or yarn package manager
- Basic SQL knowledge

---

## Installation

### Windows

1. **Download PostgreSQL Installer**
   - Visit [PostgreSQL Official Download Page](https://www.postgresql.org/download/windows/)
   - Download the latest version (14+ recommended)

2. **Run the Installer**
   - Execute the downloaded `.exe` file
   - Follow the installation wizard
   - **Important**: Remember the password you set for the `postgres` user
   - Select default port `5432`
   - Choose `English` as the locale

3. **Verify Installation**
   ```powershell
   # Open Command Prompt and run:
   psql --version
   ```

### macOS

```bash
# Using Homebrew (recommended)
brew install postgresql@15

# Start the service
brew services start postgresql@15

# Verify installation
psql --version
```

### Linux (Ubuntu/Debian)

```bash
# Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Start the service
sudo systemctl start postgresql

# Enable auto-start
sudo systemctl enable postgresql

# Verify installation
psql --version
```

---

## Creating the Database

### Method 1: Using psql Command Line (Recommended)

1. **Connect to PostgreSQL as the admin user:**
   ```bash
   # Windows
   psql -U postgres

   # macOS/Linux
   sudo -u postgres psql
   ```

2. **Create the database:**
   ```sql
   CREATE DATABASE clinicy_db;
   ```

3. **Verify the database was created:**
   ```sql
   \l
   ```
   You should see `clinicy_db` in the list.

4. **Exit psql:**
   ```sql
   \q
   ```

### Method 2: Using pgAdmin (GUI)

1. **Open pgAdmin** (installed with PostgreSQL)
2. **Right-click on "Databases"** in the left panel
3. **Select "Create > Database"**
4. **Fill in:**
   - Database name: `clinicy_db`
   - Owner: `postgres`
5. **Click Save**

---

## Environment Configuration

### 1. Copy Environment File

Navigate to the Backend folder and copy the example environment file:

```powershell
cd Backend
cp .env.example .env
```

### 2. Update `.env` File

Edit the `.env` file with your PostgreSQL credentials:

```
# PostgreSQL Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=clinicy_db
DB_USER=postgres
DB_PASSWORD=your_password_here

# Environment
NODE_ENV=development

# Server
PORT=4000

# JWT
JWT_SECRET=your_secure_jwt_secret_here

# Migrations
MIGRATIONS_DIR=src/database/migrations
```

### 3. Install Dependencies

```powershell
npm install
```

This installs:
- `pg`: PostgreSQL client library
- `pg-promise`: Promise-based PostgreSQL connector
- `dotenv`: Environment variable management

---

## Running Migrations

Migrations automatically create and update the database schema based on your migration files.

### Initial Setup: Run All Migrations

```powershell
npm run migrate
```

This will:
1. ✅ Create the `users` table
2. ✅ Create the `patients` table
3. ✅ Create the `files` table
4. ✅ Create the `migrations` tracking table
5. ✅ Create necessary indexes for performance

**Output example:**
```
🔄 Running migrations...

⏳ Running: 001_create_users_table
✅ Completed: 001_create_users_table

⏳ Running: 002_create_patients_table
✅ Completed: 002_create_patients_table

⏳ Running: 003_create_files_table
✅ Completed: 003_create_files_table

⏳ Running: 004_create_migrations_table
✅ Completed: 004_create_migrations_table

✓ All migrations completed successfully!
```

### Create a New Migration

To add a new migration (e.g., add a column):

```powershell
npm run migrate:create -- add_user_email_column
```

This creates a new migration file like `005_add_user_email_column.ts` in the migrations folder.

Then edit the file and add your SQL logic:

```typescript
export const up = async (db: any) => {
  await db.none(`
    ALTER TABLE users ADD COLUMN email VARCHAR(255) UNIQUE;
  `);
};

export const down = async (db: any) => {
  await db.none(`
    ALTER TABLE users DROP COLUMN email;
  `);
};
```

Run the migration:
```powershell
npm run migrate
```

### Rollback Migrations

To rollback (undo) all migrations:

```powershell
npm run migrate down
```

---

## Connection Verification

### 1. Test Connection Manually

```powershell
# Connect to your database
psql -U postgres -d clinicy_db -h localhost
```

### 2. View Tables

Once connected:

```sql
-- List all tables
\dt

-- You should see:
-- public | users      | table | postgres
-- public | patients   | table | postgres
-- public | files      | table | postgres
-- public | migrations | table | postgres
```

### 3. Check Database Schema

```sql
-- View users table structure
\d users

-- View patients table structure
\d patients

-- View files table structure
\d files
```

### 4. Test with the Backend

Start the backend server:

```powershell
npm run dev
```

You should see:
```
✓ Database connection established successfully
server started at localhost:4000
```

---

## Database Schema

### Users Table

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);
```

**Indexes:**
- `idx_users_username`: For fast username lookups (login)
- `idx_users_created_at`: For sorting by creation date

### Patients Table

```sql
CREATE TABLE patients (
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
```

**Indexes:**
- `idx_patients_name`: For searching patients by name
- `idx_patients_email`: For fast email lookups
- `idx_patients_age`: For filtering by age range
- `idx_patients_created_at`: For sorting by creation date

### Files Table

```sql
CREATE TABLE files (
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
```

**Indexes:**
- `idx_files_filename`: For searching files by name
- `idx_files_uploaded_by`: Links to users
- `idx_files_mime_type`: For filtering by file type
- `idx_files_created_at`: For sorting by upload date

### Migrations Table

Tracks which migrations have been run:

```sql
CREATE TABLE migrations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  run_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Database Query Examples

### Using Repositories in Code

The backend uses a Repository pattern to interact with the database:

```typescript
import { UserRepository } from '../repositories/UserRepository.js';

const userRepo = new UserRepository();

// Find all users
const users = await userRepo.findAll();

// Find user by username
const user = await userRepo.findByUsername('john_doe');

// Create new user
const newUser = await userRepo.create({
  username: 'jane_doe',
  password: 'hashed_password'
});

// Update user
const updated = await userRepo.update(1, {
  username: 'new_username'
});

// Delete user
await userRepo.deleteById(1);
```

---

## Performance Tips

### 1. Indexes

Indexes are automatically created by migrations. They significantly speed up queries:

```sql
-- View indexes
\d patients
```

### 2. Connection Pooling

The DBService automatically manages a connection pool. Default settings:
- Pool size: 20
- Idle timeout: 30 seconds
- Connection timeout: 2 seconds

### 3. Query Optimization

Always use parameterized queries to prevent SQL injection:

```typescript
// ✅ Safe - uses parameters
const query = 'SELECT * FROM users WHERE id = $1';
const result = await db.one(query, [userId]);

// ❌ Avoid - SQL injection risk
const result = await db.one(`SELECT * FROM users WHERE id = ${userId}`);
```

---

## Troubleshooting

### Error: "FATAL: role "postgres" does not exist"

**Solution:**
```bash
# macOS/Linux - Use sudo
sudo -u postgres psql

# Windows - PostgreSQL may initialize differently
# Try connecting as:
psql -U postgres -W
```

### Error: "FATAL: database does not exist"

**Solution:**
```bash
# Create the database first
psql -U postgres -c "CREATE DATABASE clinicy_db;"
```

### Error: "Connection refused (127.0.0.1:5432)"

**Solution:**
1. Check if PostgreSQL is running:
   ```powershell
   # Windows
   Get-Service postgresql-x64-*

   # macOS
   brew services list

   # Linux
   sudo systemctl status postgresql
   ```

2. Start PostgreSQL if not running:
   ```powershell
   # Windows - Restart service
   Restart-Service postgresql-x64-*

   # macOS
   brew services start postgresql

   # Linux
   sudo systemctl start postgresql
   ```

### Error: "password authentication failed"

**Solution:**
- Verify the password in `.env` matches your PostgreSQL user password
- Reset PostgreSQL password (requires local admin access)

### Error: "column does not exist"

**Solution:**
- Ensure migrations have been run: `npm run migrate`
- Check if schema is up to date with latest migrations

### Port Already in Use (4000)

**Solution:**
```powershell
# Find process using port 4000
netstat -ano | findstr :4000

# Kill the process
Stop-Process -Id <PID> -Force

# Or use a different port in .env
PORT=3001
```

---

## Useful PostgreSQL Commands

### Connect to Database
```bash
psql -U postgres -d clinicy_db -h localhost -p 5432
```

### List Databases
```sql
\l
```

### Connect to Database
```sql
\c clinicy_db
```

### List Tables
```sql
\dt
```

### View Table Structure
```sql
\d users
```

### View Indexes
```sql
\di
```

### Exit psql
```sql
\q
```

### Backup Database
```bash
pg_dump -U postgres -d clinicy_db > backup.sql
```

### Restore Database
```bash
psql -U postgres -d clinicy_db < backup.sql
```

---

## Next Steps

1. ✅ Install PostgreSQL
2. ✅ Create `clinicy_db` database
3. ✅ Configure `.env` file
4. ✅ Run `npm install`
5. ✅ Run `npm run migrate`
6. ✅ Start backend: `npm run dev`
7. ✅ Test API endpoints

---

## Additional Resources

- [PostgreSQL Official Documentation](https://www.postgresql.org/docs/)
- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)
- [pg-promise Documentation](https://vitaly-t.github.io/pg-promise/)
- [Best Practices for PostgreSQL](https://www.postgresql.org/docs/current/sql-syntax.html)
