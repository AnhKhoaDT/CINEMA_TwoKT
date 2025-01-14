const express = require("express");

const router = express.Router();

const foodController = require("./food.controller");

router.post("/", foodController.addFood);
router.get("/:foodId", foodController.getFoodById);
router.get("/", foodController.getFoods);
router.put("/:foodId", foodController.updateFood);
router.delete("/:foodId", foodController.deleteFood);

module.exports = router;
