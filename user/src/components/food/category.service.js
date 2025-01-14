const categoryModel = require("./category.model");

const CustomError = require("../../utils/CustomError");

// Thêm danh mục

const addCategory = async (categoryData) => {
  try {
    if (!categoryData || !categoryData.name) {
      throw new CustomError("Invalid category data provided", 400);
    }

    const newCategory = await categoryModel.create(categoryData);
    return newCategory;
  } catch (error) {
    throw new CustomError(error.message, 400);
  }
};

const addFoodToCategory = async (categoryId, foodData) => {
  try {
    if (!categoryId || !foodData || !foodData.title || !foodData.price) {
      throw new CustomError("Invalid input data", 400);
    }

    // Tìm danh mục theo ID
    const category = await categoryModel.findById(categoryId);
    if (!category) {
      throw new CustomError("Category not found", 404);
    }

    // Thêm món ăn vào danh mục
    category.food.push(foodData);

    // Lưu danh mục đã cập nhật
    const updatedCategory = await category.save();
    return updatedCategory;
  } catch (error) {
    throw new CustomError(error.message, 400);
  }
};

const getCategories = async () => {
  try {
    // Truy xuất danh mục, populate danh sách món ăn, và sử dụng lean để tối ưu hiệu năng
    const categories = await categoryModel
      .find()
      .populate("food") // Lấy thông tin chi tiết của món ăn liên kết
      .lean(); // Chuyển kết quả sang plain JavaScript object

    return categories;
  } catch (error) {
    // Ném lỗi với thông báo và mã trạng thái cụ thể
    throw new CustomError(
      error.message || "Failed to retrieve categories",
      500
    );
  }
};

const getCategoryById = async (categoryId) => {
  try {
    // Kiểm tra nếu không có categoryId
    if (!categoryId) {
      throw new CustomError("Category ID is required", 400);
    }

    // Tìm danh mục bằng ID
    const category = await categoryModel.findById(categoryId).populate("food");
    // Nếu không tìm thấy danh mục
    if (!category) {
      throw new CustomError("Category not found", 404);
    }

    return category; // Trả về danh mục
  } catch (error) {
    // Xử lý lỗi và ném lỗi
    throw new CustomError(error.message, error.status || 500);
  }
};

module.exports = {
  addCategory,
  addFoodToCategory,
  getCategories,
  getCategoryById,
};
