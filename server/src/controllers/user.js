const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const getUsers = async (req, res) => {
  const data = await User.find();
  res.json({ data });
};

const getUsersByID = async (req, res) => {
  const data = await User.findById(req.params.id);
  res.json({ data });
};

const loginUser = async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });
  if (!userExists) {
    return res.status(404).json();
  } else {
    const isMatched = await bcrypt.compare(
      req.body.password,
      userExists.password
    );
    if (isMatched) {
      res.status(200).json({ msg: "logged In" });
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

const editUserById = async (req, res) => {
  const data = await User.findByIdAndUpdate(req.params.id, req.body);
  if (data) {
    res.json({ msg: "User Edited" });
  }
};

const deleteUserById = async (req, res) => {
  const data = await User.findByIdAndDelete(req.params.id);
  if (data) {
    res.json({ msg: "User Deleted" });
  }
};

module.exports = {
  registerNewUser,
  editUserById,
  getUsers,
  deleteUserById,
  getUsersByID,
  loginUser,
};
