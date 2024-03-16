import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API with TypeScript',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/*.ts'], // path to your API files
};

export const swaggerSpec = swaggerJSDoc(options);