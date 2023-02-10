const express = require("express");
const {
  loginAdmin,
  fetchUsers,
  addUser,
  deleteUser,
  fetchUser,
  updateUser,
} = require("../controllers/adminController");
const requireAuthAdmin = require("../middleware/requireAuthAdmin");
const router = express.Router();

router.post("/login", loginAdmin);

router.get("/users", requireAuthAdmin, fetchUsers);

router.post("/addUser", requireAuthAdmin, addUser);

router.delete("/users/:id", requireAuthAdmin, deleteUser);

router.get("/users/:id", requireAuthAdmin, fetchUser);

router.patch("/users/:id", requireAuthAdmin, updateUser);

module.exports = router;
