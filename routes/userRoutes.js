const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");
const passport = require("passport")
const router = express.Router();

router.route("/")
.get((req,res)=>res.render("register"))
.post(registerUser);

router.route("/login")
.get((req,res)=>res.render("login"))
.post(passport.authenticate("local"),loginUser);  

module.exports = router