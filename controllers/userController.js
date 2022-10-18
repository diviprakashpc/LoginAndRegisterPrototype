const asyncHandler = require("express-async-handler");
const User = require("../db/userSchema");
const { generateHash } = require("../utils/generateHash");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const foundUser = await User.findOne({ email });
  if (foundUser) {
    res.status(400);
    throw new Error("User already Exists");
  }
  const hash = await generateHash(password);
  const user = await User.create({
    name,
    email,
    password: hash,
  });
  if (user) {
    // res.status(200).json({
    //   name: user.name,
    //   email: user.email,
    // });
    res.render("login");
  } else {
    throw new Error("Error in creating User");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  // res.json({
  //   message: "Successfully Loggedin",
  //   user: req.user ? JSON.stringify(req.user) : "No user",
  // });
  res.redirect("/api/blogs/");
});

module.exports = { registerUser, loginUser };
