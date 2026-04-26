# Database Architecture & Repository Pattern

This document explains the new database architecture of the Clinicy Backend, including the repository pattern, services, and database integration.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Repository Pattern](#repository-pattern)
- [Project Structure](#project-structure)
- [Database Connection](#database-connection)
- [Migration System](#migration-system)
- [Usage Examples](#usage-examples)
- [Best Practices](#best-practices)

---

## Overview

The Clinicy backend uses a **Repository Pattern** for database access, which provides:

✅ **Abstraction Layer**: Decouples business logic from database logic
✅ **Reusability**: Common database operations in a base repository
✅ **Testability**: Easy to mock repositories in tests
✅ **Maintainability**: Centralized database queries
✅ **Scalability**: Easy to add new entities and repositories

---

## Architecture

```
┌─────────────────────────────────────────┐
│          Controllers                     │
│  (UserController, PatientController...)  │
└────────────┬────────────────────────────┘
             │ uses
┌────────────▼────────────────────────────┐
│          Services                        │
│  (UserService, PatientService...)        │
└────────────┬────────────────────────────┘
             │ uses
┌────────────▼────────────────────────────┐
│      Repositories                        │
│  (UserRepository, PatientRepository...)  │
└────────────┬────────────────────────────┘
             │ uses
┌────────────▼────────────────────────────┐
│         DBService                        │
│    (Database Connection Pool)            │
└────────────┬────────────────────────────┘
             │ connects to
┌────────────▼────────────────────────────┐
│       PostgreSQL Database                │
└─────────────────────────────────────────┘
```

---

## Repository Pattern

### What is a Repository?

A repository encapsulates all database queries for a specific entity. It acts as an in-memory collection of objects, abstracting the database layer.

### Benefits

| Benefit | Description |
|---------|-------------|
| **Separation of Concerns** | Database logic separate from business logic |
| **Reusability** | Common queries shared across the application |
| **Testability** | Easy to create mock repositories for testing |
| **Consistency** | Standardized approach to database access |
| **Maintainability** | Changes to database logic in one place |

### Base Repository Class

All repositories inherit from `BaseRepository<T>`, which provides common CRUD operations:

```typescript
abstract class BaseRepository<T> {
  // Common methods:
  async findAll(): Promise<T[]>
  async findById(id: number): Promise<T | null>
  async findBy(column: string, value: any): Promise<T[]>
  async count(): Promise<number>
  async deleteById(id: number): Promise<boolean>
  async executeQuery(query: string, values?: any[]): Promise<any[]>
}
```

---

## Project Structure

```
Backend/
├── src/
│   ├── controllers/
│   │   ├── UserController.ts         # HTTP request handlers
│   │   ├── PatientController.ts
│   │   └── FileController.ts
│   │
│   ├── services/
│   │   ├── UserService.ts            # Business logic
│   │   ├── PatientService.ts
│   │   └── FileService.ts
│   │
│   ├── repositories/
│   │   ├── BaseRepository.ts         # Abstract base class
│   │   ├── UserRepository.ts         # User database queries
│   │   ├── PatientRepository.ts      # Patient database queries
│   │   └── FileRepository.ts         # File database queries
│   │
│   ├── database/
│   │   ├── DBService.ts              # Database connection manager
│   │   ├── config.ts                 # Database configuration
│   │   └── migrations/
│   │       ├── 001_create_users_table.ts
│   │       ├── 002_create_patients_table.ts
│   │       ├── 003_create_files_table.ts
│   │       ├── 004_create_migrations_table.ts
│   │       ├── runner.ts              # Migration runner
│   │       └── createMigration.ts     # Migration generator
│   │
│   ├── middleware/
│   │   └── jwtAuth.ts
│   │
│   └── index.ts                      # Application entry point
│
├── .env.example                      # Environment variables template
├── POSTGRESQL_SETUP.md               # PostgreSQL setup guide
├── DATABASE_ARCHITECTURE.md          # This file
└── package.json
```

---

## Database Connection

### DBService

The `DBService` manages the database connection pool and provides query methods:

```typescript
import DBService from './database/DBService.js';

// Initialize (called in index.ts)
await DBService.initialize();

// Query methods
const users = await DBService.queryAll('SELECT * FROM users');
const user = await DBService.queryOne('SELECT * FROM users WHERE id = $1', [1]);

// Transaction support
await DBService.transaction(async (t) => {
  await t.none('INSERT INTO users VALUES (...)');
  await t.none('UPDATE users SET ...');
});

// Close connection
await DBService.close();
```

### Connection Configuration

Connection settings in `.env`:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=clinicy_db
DB_USER=postgres
DB_PASSWORD=your_password
```

### Connection Pool Settings

- **Pool Size**: 20 connections
- **Idle Timeout**: 30 seconds
- **Connection Timeout**: 2 seconds

---

## Migration System

Migrations automatically manage your database schema changes.

### Running Migrations

```powershell
# Run all pending migrations
npm run migrate

# Rollback all migrations
npm run migrate down
```

### Creating a New Migration

```powershell
npm run migrate:create -- add_user_email_column
```

This creates a migration file with the following structure:

```typescript
export const up = async (db: any) => {
  // Add your schema changes here
  await db.none(`
    ALTER TABLE users ADD COLUMN email VARCHAR(255);
  `);
};

export const down = async (db: any) => {
  // Add rollback logic here
  await db.none(`
    ALTER TABLE users DROP COLUMN email;
  `);
};
```

### Migration Tracking

The `migrations` table tracks which migrations have been run:

```sql
SELECT * FROM migrations;

-- Output:
-- id |              name               |         run_on
-- ---|─────────────────────────────────|──────────────────────
--  1 | 001_create_users_table          | 2024-03-29 10:00:00
--  2 | 002_create_patients_table       | 2024-03-29 10:00:01
--  3 | 003_create_files_table          | 2024-03-29 10:00:02
--  4 | 004_create_migrations_table     | 2024-03-29 10:00:03
```

---

## Usage Examples

### User Repository

```typescript
import { UserRepository } from './repositories/UserRepository.js';

const userRepo = new UserRepository();

// Create a user
const newUser = await userRepo.create({
  username: 'john_doe',
  password: 'hashed_password',
});

// Find user by username
const user = await userRepo.findByUsername('john_doe');

// Find all users
const allUsers = await userRepo.findAll();

// Find user by ID
const userById = await userRepo.findById(1);

// Update user
const updated = await userRepo.update(1, {
  username: 'jane_doe',
});

// Delete user
await userRepo.deleteById(1);

// Check if user exists
const exists = await userRepo.exists('john_doe');
```

### Patient Repository

```typescript
import { PatientRepository } from './repositories/PatientRepository.js';

const patientRepo = new PatientRepository();

// Create a patient
const newPatient = await patientRepo.create({
  name: 'Ahmed Ali',
  age: 30,
  email: 'ahmed@example.com',
  phone: '+20101234567',
});

// Search patients by name
const results = await patientRepo.searchByName('Ahmed');

// Find patients by age range
const ageRange = await patientRepo.findByAgeRange(25, 35);

// Find patient by email
const patient = await patientRepo.findByEmail('ahmed@example.com');

// Get recent patients
const recent = await patientRepo.getRecent(10);

// Update patient
const updated = await patientRepo.update(1, {
  age: 31,
});

// Delete patient
await patientRepo.deleteById(1);
```

### File Repository

```typescript
import { FileRepository } from './repositories/FileRepository.js';

const fileRepo = new FileRepository();

// Create file record
const newFile = await fileRepo.create({
  filename: 'report.pdf',
  filepath: '/uploads/report.pdf',
  size: 1024000,
  mime_type: 'application/pdf',
  uploaded_by: 1,
});

// Search files
const pdfs = await fileRepo.findByMimeType('application/pdf');

// Get user's files
const userFiles = await fileRepo.findByUploadedBy(1);

// Get recent files
const recent = await fileRepo.getRecent(20);

// Get total storage used by user
const totalSize = await fileRepo.getTotalSizeByUser(1);
```

### Service Layer

Services use repositories and add business logic:

```typescript
import { UserService } from './services/UserService.js';

// Register new user
const token = await UserService.register('john_doe', 'password123');

// Login user
const token = await UserService.login('john_doe', 'password123');

// Get user info
const user = await UserService.getUserById(1);
```

---

## Best Practices

### 1. Always Use Repositories

❌ Don't access the database directly in controllers:

```typescript
// Bad
app.get('/users/:id', async (req, res) => {
  const user = await db.one('SELECT * FROM users WHERE id = $1', [req.params.id]);
  res.json(user);
});
```

✅ Use repositories:

```typescript
// Good
app.get('/users/:id', async (req, res) => {
  const userRepo = new UserRepository();
  const user = await userRepo.findById(req.params.id);
  res.json(user);
});
```

### 2. Add Business Logic in Services

Services handle validation, transformation, and composition of repository operations:

```typescript
// UserService.ts
static async register(username: string, password: string): Promise<string> {
  // Validation
  if (!username || !password) {
    throw new Error('Invalid input');
  }

  // Business logic
  const exists = await this.userRepository.exists(username);
  if (exists) {
    throw new Error('User already registered');
  }

  // Hash password (business logic)
  const hashedPassword = await bcrypt.hash(password, 10);

  // Use repository
  return this.userRepository.create({
    username,
    password: hashedPassword,
  });
}
```

### 3. Use Parameterized Queries

Always use parameters to prevent SQL injection:

```typescript
// ✅ Safe
const query = 'SELECT * FROM users WHERE username = $1';
const user = await DBService.queryOne(query, ['john_doe']);

// ❌ Dangerous
const user = await DBService.queryOne(
  `SELECT * FROM users WHERE username = 'john_doe'`
);
```

### 4. Handle Transactions

For operations that must succeed or fail together, use transactions:

```typescript
await DBService.transaction(async (t) => {
  // All operations here succeed or fail together
  await t.none('INSERT INTO users VALUES (...)');
  await t.none('INSERT INTO logs VALUES (...)');
  // If any fails, all are rolled back
});
```

### 5. Add Indexes for Performance

Migrations already include common indexes. Add more for frequently searched columns:

```typescript
export const up = async (db: any) => {
  await db.none(`
    CREATE INDEX idx_patients_phone ON patients(phone);
  `);
};
```

### 6. Use .gitignore

Add sensitive files:

```
.env
node_modules/
dist/
*.log
```

### 7. Error Handling

Handle database errors gracefully:

```typescript
try {
  const user = await userRepo.findById(1);
  if (!user) {
    res.status(404).json({ error: 'User not found' });
  }
} catch (error) {
  console.error('Database error:', error);
  res.status(500).json({ error: 'Internal server error' });
}
```

---

## Common Tasks

### Add a New Entity (e.g., Appointments)

1. **Create migration:**
   ```powershell
   npm run migrate:create -- create_appointments_table
   ```

2. **Define migration:**
   ```typescript
   export const up = async (db: any) => {
     await db.none(`
       CREATE TABLE appointments (
         id SERIAL PRIMARY KEY,
         patient_id INTEGER NOT NULL,
         doctor_id INTEGER NOT NULL,
         appointment_date TIMESTAMP,
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
         FOREIGN KEY (patient_id) REFERENCES patients(id),
         FOREIGN KEY (doctor_id) REFERENCES users(id)
       );
     `);
   };
   ```

3. **Create interface:**
   ```typescript
   // repositories/AppointmentRepository.ts
   export interface IAppointment {
     id?: number;
     patient_id: number;
     doctor_id: number;
     appointment_date: Date;
     created_at?: Date;
   }
   ```

4. **Create repository:**
   ```typescript
   export class AppointmentRepository extends BaseRepository<IAppointment> {
     constructor() {
       super('appointments');
     }
     // Add specific methods...
   }
   ```

5. **Create service:**
   ```typescript
   export class AppointmentService {
     private static appointmentRepository = new AppointmentRepository();
     // Add methods...
   }
   ```

6. **Create controller:**
   ```typescript
   // Handle HTTP requests
   ```

7. **Run migration:**
   ```powershell
   npm run migrate
   ```

---

## Troubleshooting

### Database Connection Failed

```bash
# Check PostgreSQL is running
# Windows
Get-Service postgresql-x64-*

# macOS
brew services list

# Linux
sudo systemctl status postgresql
```

### Migration Failed

```bash
# Check migration syntax
# Look at migration file for SQL errors
# Rollback and fix:
npm run migrate down
# Edit the migration file
# Run again:
npm run migrate
```

### Query Returns No Results

```bash
# Check database has data:
psql -U postgres -d clinicy_db
SELECT * FROM users;

# Check indexes are created:
\di

# Verify field names and types:
\d users
```

---

## Performance Tips

### 1. Use Indexes Wisely

```sql
-- Good for frequent searches
CREATE INDEX idx_users_email ON users(email);

-- Good for sorting
CREATE INDEX idx_users_created_at ON users(created_at);

-- Composite index for common filters
CREATE INDEX idx_patients_name_age ON patients(name, age);
```

### 2. Limit Query Results

```typescript
// Instead of fetching all
const all = await userRepo.findAll(); // Could be millions

// Fetch with limit
const recent = await userRepo.getRecent(10);
```

### 3. Use Connection Pooling

The DBService automatically manages connection pooling for better performance.

### 4. Cache When Appropriate

For frequently accessed but rarely changing data, consider caching.

---

## Additional Resources

- [Repository Pattern - Microsoft Docs](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/infrastructure-persistence-layer-design)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [pg-promise Documentation](https://vitaly-t.github.io/pg-promise/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
