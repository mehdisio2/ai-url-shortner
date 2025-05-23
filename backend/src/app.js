import express from 'express';  // Use import instead of require
//import cors from 'cors';        // Use import for cors
import routes from './routes/routes.js';  // Use import for routes (with the .js extension)
import cookieParser from 'cookie-parser';

const app = express();

// Middleware
app.use(cookieParser());

app.use(express.json()); // Parse JSON request body

/*app.use(cors({
    origin: 'http://192.168.157.157' ,
    credentials: true
  }));
*/
app.use('/api/', routes)

export default app;  // Use export default to export the app

