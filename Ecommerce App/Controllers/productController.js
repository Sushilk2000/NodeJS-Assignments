const productModel = require("../Models/ProductModel");
const jwt = require("jsonwebtoken");
const createProduct = async (req, res) => {
  try {
    console.log("productDecoded", req.decoded);
    if (req.decoded.role == "admin") {
      const newproduct = await productModel.create(req.body);
      console.log(newproduct);
      res.json({
        success: true,
        message: "Product created successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      sucess: false,
      message: "Something went wrong",
    });
  }
};
const getProduct = async (req, res) => {
  try {
    const productList = await productModel.find({});
    res.json({
      success: true,
      message: "Dummy product get Api",
      results: productList,
    });
  } catch (error) {
    res.status(400).json({
      sucess: false,
      message: "Something went wrong",
    });
  }
};

const editProduct = async (req, res) => {
  try {
    const payload = jwt.decode(req.headers.authorization);
    if (payload.role === "admin") {
      const productId = req.body._id;
      delete req.body._id;
      await productModel.updateOne({ _id: productId }, { $set: req.body });
      res.json({
        success: true,
        message: "Product updated successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const likeDislikeProduct = async (req, res) => {
  try {
    const updateObject = {
      $push: {
        likes: req.user._id,
      },
      $pull: {
        dislikes: req.user._id,
      },
    };
    if (req.params.action === "dislike") {
      updateObject = {
        $push: {
          dislikes: req.user._id,
        },
        $pull: {
          likes: req.user._id,
        },
      };
      await productModel.findByIdAndUpdate(req.params.productId, updateObject);

      res.json({
        sucess: true,
        message: `product ${req.params.action}d successfully`,
      });
    }
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "Something went wrong",
    });
  }
};
const ratingAndReview = async (req, res) => {
  try {
    updatedObj = {
      $push: {
        rating: req.body.rating,
        review: req.body.review,
      },
    };
    await productModel.findByIdAndUpdate(req.params.productId, updatedObj);
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "Something went wrong",
    });
  }
};
module.exports = {
  createProduct,
  getProduct,
  editProduct,
  likeDislikeProduct,
  ratingAndReview,
};
