import express from "express";
import cors from 'cors';
import FileController from './controllers/FileController.js';
import UserController from './controllers/UserController.js';
import PatientController from './controllers/PatientController.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import DBService from './database/DBService.js';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Clinicy Backend API',
      version: '1.0.0',
      description: 'API documentation for Clinicy Backend',
    },
    servers: [
      {
        url: 'http://localhost:4000',
      },
    ],
    components: {
      schemas: {
        Patient: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            age: { type: 'integer' },
          },
        },
      },
    },
  },
  apis: ['./src/**/*.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
const port = process.env.PORT || 4000;

// Initialize database and start server
async function startServer() {
  try {
    // Initialize database connection
    await DBService.initialize();

    // Start the Express server
    app.listen(port, () => {
      console.log(`✓ Server started at http://localhost:${port}`);
    });

    // Routes
    app.use('/appendfile', FileController);
    app.use('/users', UserController);
    app.use('/patients', PatientController);

    // Health check endpoint
    app.get('/health', (req, res) => {
      res.json({ status: 'ok', timestamp: new Date().toISOString() });
    });

  } catch (error) {
    console.error('✗ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('\n✓ SIGTERM received, shutting down gracefully...');
  await DBService.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('\n✓ SIGINT received, shutting down gracefully...');
  await DBService.close();
  process.exit(0);
});
