const categoryService = require("./category.service");

const CustomError = require("../../utils/CustomError");

const addCategory = async (req, res) => {
  try {
    const categoryData = req.body;

    const newCategory = await categoryService.addCategory(categoryData);

    res.status(201).json({ category: newCategory });
  } catch (error) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await categoryService.getCategories();

    res.status(200).json({ categories });
  } catch (error) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};

const addFoodToCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const foodData = req.body;

    const updatedCategory = await categoryService.addFoodToCategory(
      categoryId,
      foodData
    );

    res.status(200).json({ category: updatedCategory });
  } catch (error) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await categoryService.getCategoryById(categoryId);

    res.status(200).json({ category });
  } catch (error) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};



module.exports = {
  addCategory,
  getCategories,
  addFoodToCategory,
  getCategoryById,
};
