const express = require('express');
const router = express.Router();
const employeeController = require('../controller/constroller.js');

// Routes
router.get('/', employeeController.getEmployees);
router.get('/new', employeeController.showAddEmployeeForm);
router.post('/', employeeController.addEmployee);
router.get('/:id/edit', employeeController.showEditEmployeeForm);
router.put('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;