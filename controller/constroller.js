const Employee = require('../module/model');

// Display all employees with pagination
exports.getEmployees = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const total = await Employee.countDocuments();
    const employees = await Employee.find().skip(skip).limit(limit);

    res.render('index', {
      employees,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// Show form to add a new employee
exports.showAddEmployeeForm = (req, res) => {
  res.render('add');
};

// Add a new employee
exports.addEmployee = async (req, res) => {
  try {
    const { title, description, price, rating } = req.body;
    await Employee.create({ title, description, price, rating });
    res.redirect('/employees');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.showEditEmployeeForm = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    res.render('edit', { employee });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// Update an employee
exports.updateEmployee = async (req, res) => {
  try {
    const { title, description, price, rating } = req.body;
    await Employee.findByIdAndUpdate(req.params.id, { title, description, price, rating });
    res.redirect('/employees');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// Delete an employee
exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.redirect('/employees');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};



