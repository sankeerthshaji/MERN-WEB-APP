const User = require("../models/user");
const jwt = require("jsonwebtoken");
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

//loginUser
const loginUser = async (req, res) => {
  const { email, password } = req.body; //destructuring req.body
  try {
    const user = await User.login(email, password); //login user

    //create token
    const token = createToken(user._id);

    res.status(200).json({ email, token }); //send token
  } catch (error) {
    res.status(400).json({ error: error.message }); //send error
  }
};

//signupUser
const signupUser = async (req, res) => {
  const { email, password } = req.body; //destructuring req.body
  console.log(req.body);

  try {
    const user = await User.signup(email, password); //create user
    console.log(user);

    //create token
    const token = createToken(user._id);

    res.status(200).json({ email, token }); //send token
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message }); //send error
  }
};

//editProfile
const editProfile = async (req, res) => {
  try{
  console.log(req.file);
  const user = JSON.parse(req.body.user);
  console.log(user);
  const updatedUser = await User.findOneAndUpdate(
    { email: user.email },
    {
      image: {
        url: req?.file?.path,
        filename: req?.file?.filename,
      },
    }
  );
  res.status(200).json({ updatedUser });
  }catch(err){
    res.status(400).json({error:err.message});
  }
};

//getUserDetails
const getUserDetails = async (req, res) => {
  try{
  console.log(req.body);
  const user = await User.findOne({ email: req.body.email });
  res.status(200).json({ user });
  }catch(err){
    res.status(400).json({error:err.message});
  }
}

module.exports = {
  loginUser,
  signupUser,
  editProfile,
  getUserDetails,
};

