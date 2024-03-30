const { UserModel } = require("../Models/UserModel");
const { cartModel } = require("../Models/Cart");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const userRegistrator = async (req, res) => {
  const newUser = new UserModel({
    ...req.body,
  });
  await newUser.save();
  res.json({
    success: true,
    message: "User registered successfully",
  });
};
const userLogin = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    console.log(user);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (isPasswordCorrect) {
      const exptime = Math.floor(Date.now() / 1000) + 3600;
      const token = jwt.sign(
        {
          name: user.firstName,
          role: user.role,
          id: user._id,
          exp: exptime,
        },
        "abcabcabcabc"
      );
      res.json({
        success: true,
        message: "User logged in successfully",
        token: token,
      });
    } else {
      res.json({
        success: false,
        message: "Invalid password",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
    console.log(error);
  }
};

const userLogout = async (req, res) => {
  try {
    res.json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
  }
};
const userUpdate = async (req, res) => {
  try {
    const updatedUser = req.body.updatedUser;
    await UserModel.findByIdAndUpdate(req.user._id, updatedUser);
    res.json({
      success: true,
      message: `User details of user with id ${req.user._id} has been successfully updated.`,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "something went wrong",
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const deleted = await UserModel.findByIdAndDelete(req.user._id);
    res.json({
      success: true,
      message: `User with id ${req.user._id} has been successfully deleted`,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
const getLikedProducts = async (req, res) => {
  try {
    const result = await UserModel.findById(req.params.user._id).likedProducts;
    res.json({
      success: true,
      message: `User ${req.params.user.firstName} has liked following products`,
      results: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
    console.log(err);
  }
};
const getDislikedProducts = async (req, res) => {
  try {
    const result = await UserModel.findById(req.user._id).dislikedProducts;
    res.json({
      success: true,
      message: `User ${req.params.user.firstName} has disliked following products`,
      results: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
    console.log(error);
  }
};
const WishlistUpdatation = async (req, res) => {
  try {
    const status = req.user.wishlist.includes(req.body.productId);
    if (status) {
      updateObject = {
        $pull: {
          wishlist: req.body.productId,
        },
      };
      await UserModel.findByIdAndUpdate(req.user._id, updateObject);
    } else {
      updateObject = {
        $push: {
          wishlist: req.body.productId,
        },
      };
      await UserModel.findByIdAndUpdate(req.user._id, updateObject);
    }
    res.json({
      success: true,
      message: "wishlist updatation successful",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
const addToCart = async (req, res) => {
  try {
    const userCart = await cartModel.findOne({ userId: req.user._id });
    if (userCart) {
      const updateObject = {
        $push: {
          products: req.body.products,
        },
      };

      const cart = await cartModel.findOneAndUpdate(
        { userId: req.user._id },
        updateObject
      );
      res.json({
        success: true,
        message: "User cart updated successfully",
        cart: cart,
      });
    } else {
      let cartTotal = 0;
      const productsToAdd = [];
      for (let i = 0; i < req.body.products.length; i++) {
        const currentProduct = req.body.products[i];
        const { price } = await productModel.findById(
          currentProduct.productId,
          {
            price: 1,
            _id: 0,
          }
        );

        const product = {
          ...currentProduct,
          price,
        };
        productsToAdd.push(product);
        const priceForProduct = currentProduct.quantity * price;
        cartTotal += priceForProduct;
      }

      await cartModel.create({
        products: productsToAdd,
        cartTotal: cartTotal,
        userId: req.user._id,
      });
    }
    res.json({
      success: true,
      message: "User cart updated successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
const updateProductQuantity = async (req, res) => {
  try {
    const productIdToUpdate = req.body.productId;
    const updateQuantity = req.body.increase ? 1 : -1;
    const result = await UserModel.findOneAndUpdate(
      { _id: req.user._id, "cart.ProductId": productIdToUpdate },
      { $inc: { "cart.$.quantity": updateQuantity } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Product quantity updated successfully",
      cart: result.cart,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
const deleteProductFromCart = async (req, res) => {
  try {
    const productIdToDelete = req.body.productId;

    const result = await UserModel.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { cart: { ProductId: productIdToDelete } } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Product deleted from cart successfully",
      cart: result.cart,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
module.exports = {
  userRegistrator,
  userLogin,
  userLogout,
  getLikedProducts,
  getDislikedProducts,
  WishlistUpdatation,
  deleteUser,
  userUpdate,
  addToCart,
  updateProductQuantity,
  deleteProductFromCart,
};
