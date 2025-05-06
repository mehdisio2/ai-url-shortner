import express from 'express';  // Use import instead of require
import cors from 'cors';        // Use import for cors
import routes from './routes/routes.js';  // Use import for routes (with the .js extension)
import cookieParser from 'cookie-parser';

const app = express();

// Middleware
app.use(cookieParser());

app.use(express.json()); // Parse JSON request body

app.use(cors({
    origin: 'https://ai-url-shortner-3o9dxgzx8-mehdisio2s-projects.vercel.app',
    credentials: true
  }));
  

// Routes
app.use('/', routes);

export default app;  // Use export default to export the app

