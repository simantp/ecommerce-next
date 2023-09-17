const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

const uploadImage = async (req, res) => {
  if (req.file?.filename) {
    await User.findByIdAndUpdate(req.params.id, {
      $set: { avatarImage: req.file?.filename },
    });
  }
  res.json({
    msg: "image uploaded",
  });
};

const getUserImage = async (req, res) => {
  try {
    const userInfo = await User.findById(req.params.id);

    if (!userInfo) {
      return res.status(404).json({ error: "User not found" });
    }

    const imagePath = path.join(
      __dirname,
      "../../uploads/users",
      userInfo.avatarImage
    );

    if (fs.existsSync(imagePath)) {
      res.sendFile(imagePath);
    } else {
      const defaultImagePath = path.join(
        __dirname,
        "../../uploads/users/avatar.svg"
      );
      res.sendFile(defaultImagePath);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUserByID = async (req, res) => {
  const data = await User.findById(req.params.id);
  if (data) {
    res.json({ userDetails: data });
  }
};

const updateUsersByID = async (req, res) => {
  const data = await User.findByIdAndUpdate(req.params.id, req.body);
  if (data) {
    res.json({ msg: "User Updated" });
  }
};

const loginUser = async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });
  if (!userExists) {
    return res.status(404).json({ msg: "User Not Found" });
  } else {
    const isMatched = await bcrypt.compare(
      req.body.password,
      userExists.password
    );
    if (isMatched) {
      var token = await jwt.sign(
        { email: req.body.email },
        process.env.SECRET_KEY
      );
      res.status(200).json({
        isLoggedIn: true,
        msg: "Logged In",
        token,
        userInfo: userExists,
      });
    } else {
      res.status(404).json({ msg: "Not Matched" });
    }
  }
};

const registerNewUser = async (req, res) => {
  const hashPass = await bcrypt.hash(req.body.password, saltRounds);
  req.body.password = hashPass;

  const userExists = req.body.email;

  let user = await User.findOne({ email: userExists });
  if (user) {
    return res.status(409).json({ msg: "User Already Exists" });
  }

  const newUser = new User(req.body);
  if (newUser) {
    await newUser.save();
    return res.json({ msg: "User Added" });
  }
};

module.exports = {
  registerNewUser,
  getUserByID,
  loginUser,
  updateUsersByID,
  uploadImage,
  getUserImage,
};
