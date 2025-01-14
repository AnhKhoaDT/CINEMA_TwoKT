const categoryService = require("../food/category.model");
const foodModel = require("../food/food.model"); // Định nghĩa các phương thức cho foodModel
const CustomError = require("../../utils/CustomError");

// Thêm món ăn
const addFood = async (categoryID, foodData) => {
  try {
    if (!foodData || !foodData.title || !foodData.price) {
      throw new CustomError("Invalid food data provided", 400);
    }

    const category = await categoryService.findById(categoryID);
    if (!category) {
      throw new CustomError("Category not found", 404);
    }

    const newFood = await foodModel.create(foodData);
    category.food.push(newFood._id);
    await category.save();

    return newFood;
  } catch (error) {
    throw new CustomError(error.message, 400);
  }
};

// Lấy món ăn theo ID
const getFoodById = async (foodId) => {
  try {
    if (!foodId) {
      throw new CustomError("Food ID is required", 400);
    }

    const food = await foodModel.findById(foodId);
    if (!food) {
      throw new CustomError("Food not found", 404);
    }

    return food;
  } catch (error) {
    throw new CustomError(error.message, 400);
  }
};

// Lấy danh sách món ăn
const getFoods = async () => {
  try {
    const foods = await foodModel.getFoods();
    return foods;
  } catch (error) {
    throw new CustomError(error.message, 400);
  }
};

// Cập nhật món ăn
const updateFood = async (foodId, foodData) => {
  try {
    if (!foodId || !foodData) {
      throw new CustomError("Food ID and update data are required", 400);
    }

    const updatedFood = await foodModel.updateFood(foodId, foodData);
    if (!updatedFood) {
      throw new CustomError("Food not found or update failed", 404);
    }

    return updatedFood;
  } catch (error) {
    throw new CustomError(error.message, 400);
  }
};

// Xóa món ăn
const deleteFood = async (foodId) => {
  try {
    if (!foodId) {
      throw new CustomError("Food ID is required", 400);
    }

    const deletedFood = await foodModel.deleteFood(foodId);
    if (!deletedFood) {
      throw new CustomError("Food not found or deletion failed", 404);
    }

    return deletedFood;
  } catch (error) {
    throw new CustomError(error.message, 400);
  }
};

module.exports = {
  addFood,
  getFoodById,
  getFoods,
  updateFood,
  deleteFood,
};
