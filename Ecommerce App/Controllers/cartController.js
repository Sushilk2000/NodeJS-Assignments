const { cartModel } = require("../Models/Cart");
const { productModel } = require("../Models/ProductModel");

const getCart = async (req, res) => {
  try {
    const userCart = await cartModel.findOne({ userId: req.user._id });
    res.json({
      success: true,
      message: "Cart retrieved successfully",
      cart: userCart,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Cart not found",
    });
  }
};

const addToCart = async (req, res) => {
  try {
    const productId = req.params.productId;
    const userCart = await cartModel.findOne({ userId: req.user._id });
    if (!userCart) {
      const newCart = await cartModel.create({
        userId: req.user._id,
      });
    }
    const product = await productModel.findById(productId);
    const updateObj = {
      $push: {
        product: productId,
      },
      $inc: {
        cartTotal: product.price,
      },
    };
    await cart.updateOne({ userId: req.user._id }, updateObj);
    res.json({
      success: true,
      message: "Product added to cart successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
const updateCart = async (req, res) => {
  try {
    const { action, productId } = req.params;
    const cart = await cartModel.findOne({ userId: req.user._id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const cartProductIndex = cart.products.findIndex(
      (product) => String(product.product) === productId
    );

    if (cartProductIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    const cartProduct = cart.products[cartProductIndex];

    if (action === "increment") {
      cartProduct.quantity += 1;
    } else if (action === "decrement") {
      if (cartProduct.quantity === 1) {
        cart.products.splice(cartProductIndex, 1);
      } else {
        cartProduct.quantity -= 1;
      }
    }

    cart.cartTotal = calculateCartTotal(cart.products);
    cart.cartDiscountedTotal = calculateDiscountedTotal(cart.products);

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
const calculateCartTotal = (products) => {
  return products.reduce((total, product) => {
    return total + product.quantity * product.product.price;
  }, 0);
};

const calculateDiscountedTotal = (products) => {
  return products.reduce((total, product) => {
    return total + product.quantity * product.product.discountedPrice;
  }, 0);
};
module.exports = {
  addToCart,
  getCart,
  updateCart,
};
