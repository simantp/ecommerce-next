const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/users/");
  },
  filename: function (req, file, cb) {
    const imageName = Math.floor(Math.random() * 1000) + file.originalname;
    cb(null, imageName);
  },
});

const upload = multer({ storage: storage });

router.get("/user/:id", UserController.getUserByID);

router.post("/register", UserController.registerNewUser);

router.post("/signin", UserController.loginUser);

router.put("/account/:id", UserController.updateUsersByID);

router.post(
  "/user-image/:id",
  upload.single("avatar"),
  UserController.uploadImage
);
router.get("/user-image/:id", UserController.getUserImage);

module.exports = router;
