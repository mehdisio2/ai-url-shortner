import express from 'express';  // Use import instead of require
import cors from 'cors';        // Use import for cors
import routes from './routes/routes.js';  // Use import for routes (with the .js extension)

const app = express();

// Middleware
app.use(express.json()); // Parse JSON request body
app.use(cors());         // Enable CORS

// Routes
app.use('/', routes);

export default app;  // Use export default to export the app

