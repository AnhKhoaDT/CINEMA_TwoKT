const express = require("express");
const router = express.Router();

const categoryController = require("./category.controller");

router.post("/", categoryController.addCategory);
router.get("/", categoryController.getCategories);
router.post("/:categoryId", categoryController.addFoodToCategory);

module.exports = router;
