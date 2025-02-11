const billModel = require("../models/bill.model");

const customError = require("../../../utils/errors");

const createBill = async (billData) => {
  try {
    const bill = await billModel.create(billData);
    return bill;
  } catch (error) {
    throw new customError.InternalServerError(error.message);
  }
};

const getBillById = async (billId) => {
  try {
    const bill = await billModel.findById(billId);
    if (!bill) {
      throw new customError.NotFoundError("Bill not found");
    }
    return bill;
  } catch (error) {
    throw new customError.InternalServerError(error.message);
  }
};

const getBillByUserId = async (userId) => {
  try {
    const bill = await billModel.findOne({ userID: userId });
    if (!bill) {
      throw new customError.NotFoundError("Bill not found");
    }
    return bill;
  } catch (error) {
    throw new customError.InternalServerError(error.message);
  }
};

const updateBill = async (billId, billData) => {
  try {
    const bill = await billModel.findByIdAndUpdate(billId, billData, {
      new: true,
    });
    if (!bill) {
      throw new customError.NotFoundError("Bill not found");
    }
    return bill;
  } catch (error) {
    throw new customError.InternalServerError(error.message);
  }
};

const deleteBill = async (billId) => {
  try {
    const bill = await billModel.findByIdAndDelete(billId);
    if (!bill) {
      throw new customError.NotFoundError("Bill not found");
    }
    return bill;
  } catch (error) {
    throw new customError.InternalServerError(error.message);
  }
};

module.exports = {
  createBill,
  getBillById,
  getBillByUserId,
  updateBill,
  deleteBill,
};
