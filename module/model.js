const mongoose = require("mongoose");

const EmployeeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      rating: {
        type: Number,
        required: true
      }
});
const Employee = mongoose.model('Employee', EmployeeSchema);
module.exports = Employee;
