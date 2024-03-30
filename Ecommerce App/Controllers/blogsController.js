const { blogsModel, authorModel } = require("../Models/blogs");
const createBlog = async (req, res) => {
  try {
    const newBlog = await blogsModel.create(req.body);
    console.log(newBlog);
    const author = await authorModel.findOne({
      author: req.body.author,
    });
    if (!author) {
      await authorModel.create({
        author: req.body.author,
      });
    }
    const updateObj = {
      $push: {
        blogs: newBlog._id,
      },
    };
    await authorModel.updateOne({
      author: req.body.author,
      updateObj,
    });

    res.json({
      success: true,
      message: "Blog created successfully",
      blog: newBlog,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Blog not created",
    });
  }
};

const getBlog = async (req, res) => {
  try {
    const blog = await blogsModel.findOne({
      _id: req.params.id,
    });
    if (!blog) {
      res.status(404).json({
        success: false,
        message: "Blog not found",
      });
      return;
    }
    res.json({
      success: true,
      message: "Blog retrieved successfully",
      blog: blog,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Blog not found",
    });
  }
};
const getBlogsByAuthor = async (req, res) => {
  try {
    const blogs = await authorModel
      .findOne({
        author: req.params.author,
      })
      .populate("blogs");
    if (!blogs) {
      res.status(404).json({
        success: false,
        message: "Blog not found",
      });
      return;
    }
    res.json({
      success: true,
      message: "Blog retrieved successfully",
      blog: blogs,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Blog not found",
    });
  }
};
const getAuthors = async (req, res) => {
  try {
    const authors = await authorModel.find();
    if (!authors) {
      res.status(404).json({
        success: false,
        message: "Author not found",
      });
      return;
    }
    res.json({
      success: true,
      message: "Author retrieved successfully",
      author: authors,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Author not found",
    });
  }
};
module.exports = {
  createBlog,
  getBlog,
  getAuthors,
  getBlogsByAuthor,
};
