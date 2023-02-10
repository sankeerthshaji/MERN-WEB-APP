const express = require('express');
const {loginAdmin , fetchUsers , addUser , deleteUser , fetchUser , updateUser} = require('../controllers/adminController')
const router = express.Router();

router.post("/login",loginAdmin);

router.get("/users", fetchUsers);

router.post("/addUser" , addUser);

router.delete("/users/:id", deleteUser);

router.get("/users/:id", fetchUser);

router.patch("/users/:id", updateUser)

module.exports = router;