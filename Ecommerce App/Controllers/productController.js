const productModel = require("../Models/ProductModel");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../Models/UserModel");
const { brandModel } = require("../Models/Brands");
const createProduct = async (req, res) => {
  try {
    const newproduct = await productModel.create(req.body);
    console.log(newproduct);
    const brand = await brandModel.findOne({ brand: req.body.brand });
    console.log("brands", brand);
    if (!brand) {
      console.log("brand", brand);
      brand = await brandModel.create({
        brand: req.body.brand,
      });
    }
    const updateBrand = {
      $push: {
        products: newproduct._id,
      },
    };
    await brandModel.updateOne({ brand: req.body.brand }, updateBrand);
    res.json({
      success: true,
      message: "Product created successfully",
    });
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
    const productId = req.params.productId;
    await productModel.updateOne({ _id: productId }, { $set: req.body });
    res.json({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const result = await productModel.findByIdAndDelete(req.params.productId);
    res.json({
      success: true,
      message: `Product with id ${req.params.productId} has been deleted successfully`,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Something went wrong",
    });
  }
};
const likeDislikeProduct = async (req, res) => {
  console.log(req);
  try {
    let updateObject = {
      $push: {
        liked: req.user._id,
      },
      $pull: {
        disliked: req.user._id,
      },
    };
    let updateUser = {
      $push: {
        likedProducts: req.params.productId,
      },
      $pull: {
        dislikedProducts: req.params.productId,
      },
    };
    if (req.params.action === "dislike") {
      updateObject = {
        $push: {
          disliked: req.user._id,
        },
        $pull: {
          liked: req.user._id,
        },
      };

      updateUser = {
        $push: {
          dislikedProducts: req.params.productId,
        },
        $pull: {
          likedProducts: req.params.productId,
        },
      };
    }
    await productModel.findByIdAndUpdate(req.params.productId, updateObject);
    await UserModel.findByIdAndUpdate(req.user._id, updateUser);
    res.json({
      success: true,
      message: `Product ${req.params.action}d successfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong here",
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
const getProductbyBrand = async (req, res) => {
  try {
    const productList = await productModel.find({ brand: req.params.brand });
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

module.exports = {
  createProduct,
  getProduct,
  editProduct,
  deleteProduct,
  likeDislikeProduct,
  ratingAndReview,
  getProductbyBrand,
};
