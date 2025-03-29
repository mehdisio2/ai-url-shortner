const express = require("express");
const cors = require("cors");
const routes = require("./routes"); // Importing routes

const app = express();

// Middleware
app.use(express.json()); // Parse JSON request body
app.use(cors());         // Enable CORS


// Routes
app.use("/", routes);

module.exports = app;
