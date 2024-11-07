// routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const Employee = require('../Model/employeeSchema'); // Import the Employee model



// Create a new employee
router.post('/create', async (req, res) => {
  const { name, gender, email, designation, mobileno } = req.body;
  if (!name || !gender || !email || !designation || !mobileno) {
    return res.status(400).json({ message: 'All employee details are required.' });
  }
  
  try {
    const employee = new Employee({
      name,
      gender,
      email,
      designation,
      mobileno
    });
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



// Get all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single employee by ID
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// we are Searching employee by name
router.get('/search/:name', async (req, res) => {
  const { name } = req.params; // Access name from params
  console.log(`Searching for employees with name: ${name}`); // Debug log

  try {
    const employees = await Employee.find({ name: new RegExp(name, 'i') }); // Search with case-insensitive regex
    console.log('Found employees:', employees); // Debug log
    if (employees.length === 0) return res.status(404).json({ message: 'No employees found' });
    res.status(200).json(employees);
  } catch (error) {
    console.error(error); // Debug log
    res.status(500).json({ message: error.message });
  }
});




// Update an employee by ID
router.put('/:id', async (req, res) => {
  const { name, gender, email, designation, mobileno } = req.body;
  
  // Validate the request body
  if (!name || !gender || !email || !designation || !mobileno) {
    return res.status(400).json({ message: 'All employee details are required for updating.' });
  }

  try {
    // Find and update the employee
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, gender, email, designation, mobileno },
      { new: true } // Return the updated document
    );

    // Check if employee was found
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    
    // Return the updated employee
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Delete an employee by ID
router.delete('/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
