const express = require("express");
const {
  listBlogs,
  addBlog,
  getBlogById,
  deleteBlogById,
  updateBlogById,
} = require("../controllers/blogController");
const { protect } = require("../Middlewares/protect");
const router = express.Router();

router.route("/").get(protect,listBlogs);

router.route("/createBlog")
.get((req,res)=>res.render("createBlog"))
.post(protect,addBlog);

router
  .route("/:id")
  .get(protect,getBlogById)
  .delete(protect,deleteBlogById)
  .put(protect,updateBlogById);

module.exports = router;
