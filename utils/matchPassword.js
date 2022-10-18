const bcrypt = require("bcryptjs");


exports.matchPassword = async (enteredPassword,password)=>{
    return await bcrypt.compare(enteredPassword,password)
  }