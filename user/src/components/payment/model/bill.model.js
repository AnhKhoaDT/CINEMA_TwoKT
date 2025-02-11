const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ticketList: [
    {
      seatID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seat",
        required: true,
      },
    },
  ],
  foodList: [
    {
      foodID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
      },
      quantity: {
        type: Number,
        min: 1,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "paid", "cancelled"],
    default: "pending",
  },
});

billSchema.methods.calculateTotalPrice = async function () {
  let total = 0;

  // Tính tổng tiền vé
  if (this.ticketList && this.ticketList.length > 0) {
    const Seat = mongoose.model("Seat");
    const seatPrices = await Seat.find({
      _id: { $in: this.ticketList.map((ticket) => ticket.seatID) },
    }).select("price");

    total += seatPrices.reduce((sum, seat) => sum + seat.price, 0);
  }

  // Tính tổng tiền thức ăn
  if (this.foodList && this.foodList.length > 0) {
    const Food = mongoose.model("Food");
    const foodPrices = await Food.find({
      _id: { $in: this.foodList.map((food) => food.foodID) },
    }).select("price");

    total += this.foodList.reduce((sum, foodItem) => {
      const food = foodPrices.find((f) => f._id.equals(foodItem.foodID));
      return sum + (food ? food.price * foodItem.quantity : 0);
    }, 0);
  }

  return total;
};

billSchema.pre("save", async function (next) {
  try {
    this.totalPrice = await this.calculateTotalPrice();
    next();
  } catch (error) {
    next(error);
  }
});

const billModel = mongoose.model("Bill", billSchema);

module.exports = billModel;
