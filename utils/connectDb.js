const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect("mongodb://localhost:27017/users");
    if (connect)
      console.log(`Connected to ${JSON.stringify(connect.connection.host)}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
