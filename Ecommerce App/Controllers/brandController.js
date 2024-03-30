const { brandModel } = require("../Models/Brands");

const getBrands = async (req, res) => {
  try {
    const brands = await brandModel.find({}).populate("products");
    res.json({
      success: true,
      message: "Dummy product get Api",
      brands: brands,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = {
  getBrands,
};
