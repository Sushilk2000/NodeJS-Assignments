const { cartModel } = require("../Models/Cart");
const productModel = require("../Models/ProductModel");

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

const createCart = async (req, res) => {
  try {
    const userCart = await cartModel.findOne({ userId: req.user._id });
    if (userCart) {
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

module.exports = {
  createCart,
  getCart,
};
