const foodService = require("./food.service");

const CustomError = require("../../utils/CustomError");

const addFood = async (req, res) => {
  try {
    console.log(req.body.food);
    const foodData = req.body.food;
    const categoryID = req.body.categoryID;

    const newFood = await foodService.addFood(categoryID, foodData);

    res.status(201).json({ food: newFood });
  } catch (error) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};

const getFoodById = async (req, res) => {
  try {
    const { foodId } = req.params;

    const food = await foodService.getFoodById(foodId);

    res.status(200).json({ food });
  } catch (error) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};

const getFoods = async (req, res) => {
  try {
    const foods = await foodService.getFoods();

    res.status(200).json({ foods });
  } catch (error) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};

const updateFood = async (req, res) => {
  try {
    const { foodId } = req.params;
    const foodData = req.body;

    const updatedFood = await foodService.updateFood(foodId, foodData);

    res.status(200).json({ food: updatedFood });
  } catch (error) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};

const deleteFood = async (req, res) => {
  try {
    const { foodId } = req.params;

    const deletedFood = await foodService.deleteFood(foodId);

    res.status(200).json({ food: deletedFood });
  } catch (error) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addFood,
  getFoodById,
  getFoods,
  updateFood,
  deleteFood,
};
