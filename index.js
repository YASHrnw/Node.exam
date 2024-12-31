const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const employeeRoutes = require("./router/router.js");
const Employee = require("./module/model.js"); // Import Employee model

const app = express();

// Middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));  // For form data
app.use(bodyParser.json());  
app.use(methodOverride("_method"));
app.use(express.static("public"));

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/employeeDB", {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Routes
app.use("/employees", employeeRoutes);

// Home route
app.get("/", (req, res) => {
  res.redirect("/employees");
});

// Add employee route
exports.addEmployee = (req, res) => {
  const { title, description, price, rating } = req.body;

  // Create a new employee instance
  const newEmployee = new Employee({
    title,
    description,
    price,
    rating,
  });

  newEmployee
    .save()
    .then(() => {
      res.redirect("/employees"); // Redirect to the employee list page after saving
    })
    .catch((err) => {
      console.error("Error saving employee:", err);
      res.status(500).send("Error saving employee");
    });
};

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
