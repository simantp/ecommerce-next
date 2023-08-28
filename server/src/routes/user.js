const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");

router.get("/users", UserController.getUsers);

router.get("/users/:id", UserController.getUsersByID);

router.post("/register", UserController.registerNewUser);

router.put("/users/:id", UserController.editUserById);

router.delete("/users/:id", UserController.deleteUserById);

router.post("/signin", UserController.loginUser);

module.exports = router;
