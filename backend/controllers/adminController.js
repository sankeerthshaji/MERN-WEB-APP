const Admin = require("../models/admin");
const User = require("../models/user");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

//loginUser
const loginAdmin = async (req, res) => {
  const { email, password } = req.body; //destructuring req.body
  try {
    const user = await Admin.login(email, password); //login user

    //create token
    const token = createToken(user._id);

    res.status(200).json({ email, token }); //send token
  } catch (error) {
    res.status(400).json({ error: error.message }); //send error
  }
};

//fetch users from database
const fetchUsers = async (req, res) => {
  try {
    const users = await User.find({}); //fetch all users
    res.status(200).json({ users }); //send users
  } catch (error) {
    res.status(400).json({ error: error.message }); //send error
  }
};

//addUser
const addUser = async (req, res) => {
  const { email, password } = req.body; //destructuring req.body

  //add doc to database
  try {
    const user = await User.signup(email, password); //create user
    res.status(200).json({ user }); //send user
  } catch (error) {
    res.status(400).json({ error: error.message }); //send error
  }
}

//deleteUser
const deleteUser = async (req, res) => {
  const { id } = req.params; //destructuring req.params
  
  //delete doc from database
  try {
    const user = await User.findByIdAndDelete(id); //delete user
    res.status(200).json({ user }); //send user
  } catch (error) {
    res.status(400).json({ error: error.message }); //send error
  }
}

//fetch user from database by id
const fetchUser = async (req, res) => {
  const { id } = req.params; //destructuring req.params
  console.log(id);
  try {
    const user = await User.findById(id); //fetch user
    res.status(200).json({ user }); //send user
  } catch (error) {
    res.status(400).json({ error: error.message }); //send error
  }
}

//updateUser
const updateUser = async (req, res) => {
  const { id } = req.params; //destructuring req.params
  const { email } = req.body; //destructuring req.body

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try{
    const user = await User.findByIdAndUpdate(id, {email}, {new: true}); //update user
    res.status(200).json({ user }); //send user
  } catch (error) {
    res.status(400).json({ error: error.message }); //send error
  }
}

module.exports = {
  loginAdmin,
  fetchUsers,
  addUser,
  deleteUser,
  fetchUser,
  updateUser,
};
