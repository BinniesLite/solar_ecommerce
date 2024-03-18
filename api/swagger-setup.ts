import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API with TypeScript',
      version: '1.0.0',
    },
  },
  servers: [
    {
      url: `http://localhost:4000/api`,
    },
  ],
  apis: ['./src/*.ts'], // path to your API files
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;