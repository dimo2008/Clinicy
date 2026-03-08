import { ExpressExample } from "./ExpressExample.js";
import { runExamples } from "./Examples.js";
// Call the main examples function
//console.log("Hello World2");
// runExamples().catch(console.error);
// const myFunc = (num: number): number => {
//   return num * num;
// };
// const fullName = (firstName: string, lastName: string): string => {
//   return `${firstName} ${lastName}`;
// };
// export { myFunc, fullName };
import express from "express";
import FileController from './FileController.js';
import UserController from './UserController.js';
import PatientController from './PatientController.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
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
    apis: ['./src/*.ts'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
const app = express();
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
const port = 4000;
app.listen(port, () => {
    console.log(`server started at localhost:${port}`);
});
app.use('/appendfile', FileController);
app.use('/users', UserController);
app.use('/patients', PatientController);
//# sourceMappingURL=index.js.map