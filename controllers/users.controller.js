const User = require("../models/user");
const Student = require("../models/student");
const authMiddleware = require('../middleware/auth.middleware')


// GET /users/create
exports.createUserForm = (req, res) => {
  res.render("pages/p_admin/kabinet",  {contentPath: "createUser",
    pageTitle: 'User Create',
    name: authMiddleware.getUser(req, res).name});
};


// res.render("pages/p_admin/kabinet", {
//   contentPath: "adminCourseEdit",
//   pageTitle: 'Course edit',
//   course: course,
//   name: authMiddleware.getUser(req, res).name
// });



// POST /users/create
exports.createUser = async (req, res) => {
  const { name, password, surname, dateOfBirth, passportNumber, role } = req.body;
  try {
    const user = await User.create({ name, password, role });
    const student = await Stundet.create({ name, surname, dateOfBirth, passportNumber, user });
    res.status(201).json(passenger);
  } catch (err) {
    console.log(err.message);
    res.render("pages/p_admin/kabinet", { error: err.message, contentPath: "createUser",
    pageTitle: 'User Create',
    name: authMiddleware.getUser(req, res).name });
  }
};

// GET /users
exports.getAllUsers = async (req, res) => {
  try {
    const students = await Student.find({}).populate("user");
    res.render("pages/p_admin/kabinet", { students, contentPath: "indexUser",
    pageTitle: 'Users',
    name: authMiddleware.getUser(req, res).name });
  } catch (err) {
    console.error(err);
    res.render("error", { err });
  }
};

// GET /users/:id
exports.getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.render("pages/p_admin/kabinet", { user, contentPath: "showUser",
    pageTitle: 'Show user',
    name: authMiddleware.getUser(req, res).name });
  } catch (err) {
    console.error(err);
    res.render("error", { err });
  }
};

// GET /users/:id/edit
exports.editUserForm = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findById(id);
    res.render("pages/p_admin/kabinet", { student, contentPath: "editUser",
    pageTitle: 'Edit user',
    name: authMiddleware.getUser(req, res).name });
  } catch (err) {
    console.error(err);
    res.render("error", { err });
  }
};

// POST /users/:id/edit
exports.editUser = async (req, res) => {
  const { id } = req.params;
  const { name, surname, dateOfBirth, passportNumber, user } = req.body;
  try {
    const student = await Student.findByIdAndUpdate(
      id,
      { name, surname, dateOfBirth, passportNumber, user },
      { new: true }
    );
    res.status(201).json(student);
  } catch (err) {
    console.error(err);
    res.render("error", { err });
  }
};

// POST /users/:id/delete
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await Passenger.findByIdAndDelete(id);
    res.redirect("/users");
  } catch (err) {
    console.error(err);
    res.render("error", { err });
  }
};