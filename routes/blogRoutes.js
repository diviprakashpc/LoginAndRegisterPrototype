const express = require("express");
const {
  listBlogs,
  addBlog,
  getBlogById,
  deleteBlogById,
  updateBlogById,
} = require("../controllers/blogController");
const router = express.Router();

router.route("/").get(listBlogs);
router.route("/createBlog").post(addBlog);

router
  .route("/:id")
  .get(getBlogById)
  .delete(deleteBlogById)
  .put(updateBlogById);

module.exports = router;
