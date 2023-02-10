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
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.post("/login", loginUser);

router.post("/signup", signupUser);

router.post("/editProfile", requireAuth, upload.single("image"), editProfile);

router.post("/profile", requireAuth, getUserDetails);

module.exports = router;
