# Clinicy Backend

A Node.js backend project built with TypeScript.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Project Setup

### 1. Install Dependencies

Install all project dependencies:
```bash
npm install
```

### 2. Development Dependencies

The following dev dependencies are already included:
- **TypeScript** (^5.9.3) - For type-safe JavaScript
- **ts-node** (^10.9.2) - Run TypeScript directly
- **@types/node** (^25.3.0) - TypeScript definitions for Node.js

## Available Commands

### Build the Project
Compile TypeScript to JavaScript:
```bash
npm run build
```

### Run the Project
Execute the compiled JavaScript:
```bash
npm start
```

### Development Mode
Run TypeScript files directly for development:
```bash
npm run dev
```

### Run Tests
Execute the test suite:
```bash
npm test
```

### Advanced TypeScript Commands

#### Run TypeScript Files Directly
Execute a TypeScript file directly without compilation:
```bash
npx ts-node <file>.ts
```

Example:
```bash
npx ts-node src/index.ts
```

#### Compile TypeScript to JavaScript
Compile all TypeScript files:
```bash
npx tsc
```

#### Initialize TypeScript Configuration
Create a new `tsconfig.json` file:
```bash
npx tsc --init
```

## Project Structure

```
Backend/
├── node_modules/        # Project dependencies
├── package.json         # Project configuration and dependencies
├── package-lock.json    # Dependency lock file
├── tsconfig.json        # TypeScript configuration (optional)
└── src/                 # Source code directory (create this folder)
    └── index.ts         # Main entry point
```

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Clinicy/Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a TypeScript configuration** (if not already created)
   ```bash
   npx tsc --init
   ```

4. **Create a source directory and main file**
   ```bash
   mkdir src
   ```

5. **Add your code** to `src/index.ts`

6. **Run your code**
   ```bash
   npx ts-node src/index.ts
   ```

## Adding New Dependencies

### Add a Production Dependency
```bash
npm install <package-name>
```

Example:
```bash
npm install express
```

### Add a Development Dependency
```bash
npm install --save-dev <package-name>
```

Example:
```bash
npm install --save-dev eslint
```

## Useful TypeScript Commands

### Generate JavaScript from TypeScript
```bash
npx tsc --outDir ./dist
```

### Watch Mode - Auto-compile on file changes
```bash
npx tsc --watch
```

### Strict Type Checking
Update your `tsconfig.json` with:
```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

## Common Issues & Solutions

### Command not found: `ts-node`
Make sure you've run `npm install` and use `npx ts-node` to run TypeScript files.

### TypeScript compilation errors
Check your `tsconfig.json` and ensure proper TypeScript configuration for your project needs.

### Module not found errors
Run `npm install` again and verify all dependencies are properly installed in `node_modules/`.
