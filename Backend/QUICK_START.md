# Quick Start Guide - Database Setup

A quick step-by-step guide to get the Clinicy backend running with PostgreSQL.

## Prerequisites

- [Node.js 18+](https://nodejs.org/)
- [PostgreSQL 12+](https://www.postgresql.org/download/)

## 5-Minute Setup

### Step 1: Install PostgreSQL (if not already installed)

**Windows:**
- Download and run installer from [postgresql.org](https://www.postgresql.org/download/windows/)
- Remember the `postgres` password you set

**macOS:**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### Step 2: Create Database

Open your terminal and run:

```bash
# Windows (Command Prompt)
psql -U postgres -c "CREATE DATABASE clinicy_db;"

# macOS/Linux
sudo -u postgres psql -c "CREATE DATABASE clinicy_db;"
```

### Step 3: Configure Environment

Navigate to the Backend folder:

```bash
cd Backend
```

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` with your PostgreSQL credentials:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=clinicy_db
DB_USER=postgres
DB_PASSWORD=your_postgres_password
NODE_ENV=development
PORT=4000
JWT_SECRET=your_secret_here
```

### Step 4: Install Dependencies

```bash
npm install
```

### Step 5: Run Migrations

Create the database tables:

```bash
npm run migrate
```

Expected output:
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

### Step 6: Start the Server

```bash
npm run dev
```

Expected output:
```
✓ Database connection established successfully
✓ Server started at http://localhost:4000
```

### Step 7: Test the API

Open your browser and visit:

- **Health Check**: http://localhost:4000/health
- **API Docs**: http://localhost:4000/api-docs
- **Register User**: POST to http://localhost:4000/users/register

Test with curl:

```bash
# Register a user
curl -X POST http://localhost:4000/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'

# Login
curl -X POST http://localhost:4000/users/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'

# Create a patient
curl -X POST http://localhost:4000/patients \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","age":30,"email":"john@example.com"}'
```

---

## Common Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Build TypeScript to JavaScript |
| `npm run migrate` | Run database migrations |
| `npm run migrate down` | Rollback migrations |
| `npm run migrate:create -- name` | Create new migration |
| `npm test` | Run tests |

---

## Database Schema Overview

### Users Table
- Stores user accounts
- Fields: id, username, password, created_at, updated_at

### Patients Table
- Stores patient information
- Fields: id, name, age, email, phone, address, created_at, updated_at

### Files Table
- Stores file metadata
- Fields: id, filename, filepath, size, mime_type, uploaded_by, created_at, updated_at

### Migrations Table
- Tracks which migrations have been run
- Auto-managed by the migration system

---

## Troubleshooting

### Port Already in Use

```bash
# Use different port
PORT=3001 npm run dev
```

### Cannot Connect to PostgreSQL

1. **Check if PostgreSQL is running:**
   ```bash
   # Windows
   Get-Service postgresql-x64-* | Start-Service
   
   # macOS
   brew services start postgresql@15
   
   # Linux
   sudo systemctl start postgresql
   ```

2. **Check .env credentials**

3. **Test connection:**
   ```bash
   psql -U postgres -d clinicy_db -h localhost
   ```

### Migration Failed

1. **Check for errors in output**
2. **Rollback:**
   ```bash
   npm run migrate down
   ```
3. **Check migration file syntax**
4. **Re-run:**
   ```bash
   npm run migrate
   ```

### Module Not Found Errors

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## Next Steps

1. ✅ Read [POSTGRESQL_SETUP.md](POSTGRESQL_SETUP.md) for detailed setup
2. ✅ Read [DATABASE_ARCHITECTURE.md](DATABASE_ARCHITECTURE.md) for architecture details
3. ✅ Explore the repository classes in `src/repositories/`
4. ✅ Create your first migration: `npm run migrate:create -- my_migration`
5. ✅ Build your first API endpoint using repositories

---

## Quick Reference

### Access Database Directly

```bash
# Connect to PostgreSQL
psql -U postgres -d clinicy_db

# View all tables
\dt

# View table structure
\d users

# View data
SELECT * FROM users;

# Exit
\q
```

### View Logs

```bash
# Development
npm run dev  # Logs to console

# Check error logs
# Look for error messages in the console output
```

---

## Support

For more detailed information:
- See [POSTGRESQL_SETUP.md](POSTGRESQL_SETUP.md) for PostgreSQL configuration
- See [DATABASE_ARCHITECTURE.md](DATABASE_ARCHITECTURE.md) for architecture deep-dive
- See [DOCKER_SETUP.md](DOCKER_SETUP.md) for containerization

---

## What You've Installed

- **pg-promise**: Promise-based PostgreSQL client
- **pg**: PostgreSQL client library
- **dotenv**: Environment variable management
- **bcrypt**: Password hashing
- **express**: Web framework
- **jsonwebtoken**: JWT authentication
- **swagger-jsdoc & swagger-ui-express**: API documentation

---

Happy coding! 🚀
