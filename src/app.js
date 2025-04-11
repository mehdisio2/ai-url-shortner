const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes"); // Importing routes
const app = express();

const { Client } = require('pg');
require('dotenv').config({ path: '/home/mahdi/Documents/Projects/ai-url-shortner/.env' });  // To load the variables from the .env file


// Create a new client instance
const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

// Connect to the PostgreSQL database
client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL!');
  })
  .catch((err) => {
    console.error('Connection error', err.stack);
  });


// Middleware
app.use(express.json()); // Parse JSON request body
app.use(cors());         // Enable CORS


// Routes
app.use("/", routes);

module.exports = app;
