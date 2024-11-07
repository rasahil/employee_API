// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import cors
const employeeRoutes = require("./Routes/employeeRoutes"); // Path to the routes file

const app = express();

// Use CORS middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/Employee_Data")
  .then(() => {
    console.log("Database is connected...!");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

// Use employee routes
app.use("/employees", employeeRoutes);

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
