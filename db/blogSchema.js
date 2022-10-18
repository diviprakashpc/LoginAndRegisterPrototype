const mongoose = new require("mongoose");

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
   content:{
    type:String,
    required:true,
   },
   user:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"User",
   }
},{timestamps:true});

const Blog = new mongoose.model("Blog",blogSchema);

module.exports = Blog