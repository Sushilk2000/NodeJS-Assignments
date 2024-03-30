const { categoriesModel } = require("../Models/categories");

const getCategories = async (req, res) => {
  try {
    const Categories = await categoriesModel.find({});
    res.json({
      success: true,
      message: "Dummy product get Api",
      results: Categories,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = {
  getCategories,
};
