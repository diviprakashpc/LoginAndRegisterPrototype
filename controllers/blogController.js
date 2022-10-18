const asyncHandler = require("express-async-handler");
const Blog = require("../db/blogSchema");

const listBlogs = asyncHandler(async (req, res) => {
  console.log("User id" + req.user._id);
  const blogs = await Blog.find({ user: req.user._id });

  res.render("blogs", { blogs: blogs });
});
const addBlog = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const newBlog = await Blog.create({
    title: title,
    content: content,
    user: req.user._id,
  });
  if (!newBlog) throw new Error("Error adding the blog");
  console.log("ADDED")
  res.redirect("/api/blogs/");
  // res.status(200).json({
  //   message: `Successfully added a new Blog with title ${newBlog.title}`,
  // });
});
const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    res.render("blog", { blog: blog });
  } else {
    res.status(404).json({ message: "Blog not found" });
  }
});
const deleteBlogById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findById(id);
  if (!blog) {
    res.status(404);
    throw new Error("Could'nt Delete");
  }
  await blog.remove();
  res.render("blogs", { blog: blog });
  console.log("Blog Removed");
});
const updateBlogById = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  const blog = await Blog.findById(req.params.id);
  if (blog.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (blog) {
    blog.title = title;
    blog.content = content;
    const updatedBlog = await blog.save();
    res.render("blogs", { blog: blog });
  } else {
    res.status(400);
    throw new Error("Blog not found ");
  }
});

module.exports = {
  listBlogs,
  addBlog,
  getBlogById,
  deleteBlogById,
  updateBlogById,
};
