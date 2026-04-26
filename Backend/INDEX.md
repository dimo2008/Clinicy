# Clinicy Backend - Documentation Index

Welcome to the Clinicy Backend documentation! This index will help you navigate all available guides.

## 🚀 Getting Started

### For First-Time Setup
1. **Start here:** [QUICK_START.md](QUICK_START.md) - 5-minute setup guide
2. **Then read:** [POSTGRESQL_SETUP.md](POSTGRESQL_SETUP.md) - Detailed PostgreSQL configuration

### For Understanding Architecture
1. **Read:** [DATABASE_ARCHITECTURE.md](DATABASE_ARCHITECTURE.md) - Complete architecture overview
2. **Learn about:** Repositories, Services, and Controllers

### For Docker Deployment
- **Read:** [DOCKER_SETUP.md](DOCKER_SETUP.md) - Complete Docker configuration guide

---

## 📚 Complete Documentation Guide

### QUICK_START.md
**Duration:** 5-10 minutes
**Best for:** First-time setup

Contains:
- Prerequisites checklist
- Step-by-step setup instructions
- Common commands reference
- Quick troubleshooting
- Database schema overview

**Read this if:**
- You're setting up the project for the first time
- You need to remind yourself of the setup steps
- You want a quick reference for common commands

---

### POSTGRESQL_SETUP.md
**Duration:** 15-30 minutes
**Best for:** PostgreSQL configuration and troubleshooting

Contains:
- PostgreSQL installation instructions (Windows, macOS, Linux)
- Database creation methods
- Environment configuration
- Migration system
- Database schema detailed explanation
- Performance tips
- Comprehensive troubleshooting section
- Backup and restore procedures

**Read this if:**
- You need detailed PostgreSQL setup instructions
- You're having database connection issues
- You want to optimize database performance
- You need backup/restore procedures

---

### DATABASE_ARCHITECTURE.md
**Duration:** 20-40 minutes
**Best for:** Understanding the codebase architecture

Contains:
- Architecture overview with diagrams
- Repository pattern explanation
- Project structure breakdown
- DBService documentation
- Migration system details
- Usage examples for all repositories
- Best practices
- Performance optimization tips
- Step-by-step guide to add new entities

**Read this if:**
- You're contributing to the codebase
- You need to add a new entity/table
- You want to understand how the code is organized
- You're maintaining the database layer

---

### DOCKER_SETUP.md
**Duration:** 10-20 minutes
**Best for:** Docker and containerization

Contains:
- Dockerfile configuration explanation
- How to build Docker images
- Container creation and management
- Running the app in Docker
- Docker commands reference
- Troubleshooting guide
- Quick workflow example

**Read this if:**
- You need to containerize the app
- You're deploying to production
- You want to development environment consistency
- You're using Docker Compose

---

## 🏗️ Project Structure

```
Backend/
├── src/
│   ├── controllers/          # HTTP request handlers
│   ├── services/             # Business logic
│   ├── repositories/         # Database access layer
│   │   ├── BaseRepository.ts
│   │   ├── UserRepository.ts
│   │   ├── PatientRepository.ts
│   │   └── FileRepository.ts
│   ├── database/             # Database connection & config
│   │   ├── DBService.ts
│   │   ├── config.ts
│   │   └── migrations/
│   ├── middleware/           # Express middleware
│   └── index.ts              # Application entry point
│
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore rules
├── Dockerfile                # Docker configuration
├── package.json              # Dependencies and scripts
│
├── QUICK_START.md            # 5-minute setup
├── POSTGRESQL_SETUP.md       # Detailed PostgreSQL guide
├── DATABASE_ARCHITECTURE.md  # Architecture deep-dive
├── DOCKER_SETUP.md           # Docker guide
└── README.md                 # Project overview
```

---

## 🗄️ Database Schema

### Tables

| Table | Purpose | Key Columns |
|-------|---------|------------|
| **users** | User accounts | id, username, password, created_at |
| **patients** | Patient records | id, name, age, email, phone, address |
| **files** | File metadata | id, filename, size, uploaded_by |
| **migrations** | Migration tracking | id, name, run_on |

### Indexes

All tables include performance indexes on:
- Primary keys
- Foreign keys
- Frequently searched columns
- Timestamp columns

---

## 🔧 Common Tasks

### Setup Project
```bash
cd Backend
cp .env.example .env
# Edit .env with your credentials
npm install
npm run migrate
npm run dev
```

### Create New Migration
```bash
npm run migrate:create -- migration_name
# Edit the created migration file
npm run migrate
```

### Add New Entity (e.g., Appointments)
1. Create migration (see DATABASE_ARCHITECTURE.md - "Add a New Entity")
2. Create interface (in repositories/AppointmentRepository.ts)
3. Create repository (extends BaseRepository)
4. Create service (uses repository)
5. Create controller (uses service)
6. Run migration

### Test API
```bash
# Via curl (see QUICK_START.md)
curl -X POST http://localhost:4000/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"password123"}'
```

### Deploy with Docker
```bash
cd Backend
docker build -t clinicy-backend:latest .
docker run -p 4000:4000 --name clinicy-app clinicy-backend:latest
```

---

## 🛠️ Development Commands

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Build TypeScript to JavaScript |
| `npm run migrate` | Run all pending migrations |
| `npm run migrate down` | Rollback all migrations |
| `npm run migrate:create -- name` | Create new migration |
| `npm test` | Run tests |
| `npm run debug` | Run with debugging enabled |

---

## 📋 Pre-Requisites

- **Node.js** 18 or higher
- **PostgreSQL** 12 or higher
- **npm** or **yarn**
- **Docker** (optional, for containerization)

---

## 🔐 Security Considerations

### Environment Variables
- Never commit `.env` file to Git
- Use `.env.example` as a template
- Keep secrets secure and never share

### Database
- Always use parameterized queries (prevent SQL injection)
- Hash passwords with bcrypt
- Use HTTPS in production
- Implement proper authentication/authorization

### API
- Validate all input data
- Use JWT for authentication
- Implement rate limiting
- Add proper error handling

---

## 🚨 Troubleshooting

### Quick Troubleshooting Flowchart

1. **Server won't start?**
   - Check if PostgreSQL is running
   - Verify .env file configuration
   - Check port 4000 is available
   - See: [POSTGRESQL_SETUP.md](POSTGRESQL_SETUP.md#troubleshooting)

2. **Database connection failed?**
   - Verify DB credentials in .env
   - Check PostgreSQL service status
   - Verify database exists: `psql -l`
   - See: [POSTGRESQL_SETUP.md](POSTGRESQL_SETUP.md#troubleshooting)

3. **Migrations won't run?**
   - Check migration file syntax
   - Rollback: `npm run migrate down`
   - Check for SQL errors
   - See: [DATABASE_ARCHITECTURE.md](DATABASE_ARCHITECTURE.md#troubleshooting)

4. **Docker issues?**
   - Check Docker daemon is running
   - Rebuild image: `docker build --no-cache`
   - Check logs: `docker logs clinicy-app`
   - See: [DOCKER_SETUP.md](DOCKER_SETUP.md#troubleshooting)

---

## 📖 Learning Path

### For Backend Developers
1. [QUICK_START.md](QUICK_START.md) - Get the project running
2. [DATABASE_ARCHITECTURE.md](DATABASE_ARCHITECTURE.md) - Understand the code structure
3. Explore the repository classes in `src/repositories/`
4. Create your first migration following the guide
5. Add a new endpoint using the repository pattern

### For DevOps/Deployment
1. [DOCKER_SETUP.md](DOCKER_SETUP.md) - Learn containerization
2. [POSTGRESQL_SETUP.md](POSTGRESQL_SETUP.md) - Production database setup
3. Configure environment variables for production
4. Set up automated backups

### For Database Administrators
1. [POSTGRESQL_SETUP.md](POSTGRESQL_SETUP.md) - PostgreSQL administration
2. [DATABASE_ARCHITECTURE.md](DATABASE_ARCHITECTURE.md#performance-tips) - Performance tuning
3. Learn migration patterns for schema changes
4. Implement monitoring and backups

---

## 📞 Support Resources

### Helpful Links
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [pg-promise Documentation](https://vitaly-t.github.io/pg-promise/)

### Getting Help
1. Check the relevant guide (use the index above)
2. Look in the Troubleshooting section of the guide
3. Check error messages in console output
4. Refer to the "Common Tasks" section

---

## ✨ What's Included

✅ **Repository Pattern** - Clean separation of concerns
✅ **Database Connection Pool** - Efficient connection management
✅ **Migration System** - Version control for your database
✅ **TypeScript** - Type-safe development
✅ **JWT Authentication** - Secure user authentication
✅ **Docker Support** - Easy containerization
✅ **Swagger Docs** - Auto-generated API documentation
✅ **Error Handling** - Comprehensive error management

---

## 🎯 Next Steps

1. **Start Setup:** Go to [QUICK_START.md](QUICK_START.md)
2. **Understand Architecture:** Read [DATABASE_ARCHITECTURE.md](DATABASE_ARCHITECTURE.md)
3. **Configure PostgreSQL:** Follow [POSTGRESQL_SETUP.md](POSTGRESQL_SETUP.md)
4. **Deploy with Docker:** See [DOCKER_SETUP.md](DOCKER_SETUP.md)

---

## 📝 Recent Changes

### New Features Added
- ✅ Repository pattern for data access
- ✅ PostgreSQL integration via pg-promise
- ✅ Database migration system
- ✅ DBService for connection management
- ✅ Type-safe repositories for User, Patient, and File entities
- ✅ Environment configuration with dotenv
- ✅ Comprehensive documentation

### Files Created
- `src/database/DBService.ts` - Database connection manager
- `src/database/config.ts` - Database configuration
- `src/repositories/BaseRepository.ts` - Base repository class
- `src/repositories/UserRepository.ts` - User data access
- `src/repositories/PatientRepository.ts` - Patient data access
- `src/repositories/FileRepository.ts` - File data access
- `src/database/migrations/` - Migration files and runner
- `.env.example` - Environment template
- `.gitignore` - Git ignore rules

### Files Updated
- `src/services/UserService.ts` - Now uses repository pattern
- `src/services/PatientService.ts` - Now uses repository pattern
- `src/services/FileService.ts` - Now uses repository pattern
- `src/index.ts` - Database initialization
- `package.json` - Added database dependencies and scripts

---

**Last Updated:** March 29, 2024
**Version:** 1.0.0
