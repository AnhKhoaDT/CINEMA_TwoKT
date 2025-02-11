const mongoose = require("mongoose");
const Food = require("../food/food.model");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  food: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food", // Tên model mà bạn tham chiếu đến
    },
  ],
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
