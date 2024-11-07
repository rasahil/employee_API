// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import cors
const employeeRoutes = require("./Routes/employeeRoutes"); // Path to the routes file
require('dotenv').config(); // Load environment variables from .env

const app = express();

// Use CORS middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Connect to MongoDB using the URI from the .env file
mongoose
  .connect(process.env.MONGO_URI, {
  
  })
  .then(() => {
    console.log("Database is connected...!");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

// Use employee routes
app.use("/employees", employeeRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
