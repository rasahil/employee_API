// models/employeeSchema.js
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
  email: { type: String, required: true, unique: true },
  designation: { type: String, required: true },
  mobileno: { type: String, required: true }
});

module.exports = mongoose.model('Employee', employeeSchema);
