const express = require("express");
const {
  loginUser,
  signupUser,
  editProfile,
  getUserDetails,
} = require("../controllers/userController");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });
const requireAuthUser = require("../middleware/requireAuthUser");

const router = express.Router();

router.post("/login", loginUser);

router.post("/signup", signupUser);

router.post("/editProfile", requireAuthUser, upload.single("image"), editProfile);

router.post("/profile", requireAuthUser, getUserDetails);

module.exports = router;
