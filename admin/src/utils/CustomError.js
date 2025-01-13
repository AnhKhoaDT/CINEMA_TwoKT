// src/utils/CustomError.js
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode || 500; // Đặt mặc định là 500 nếu không có statusCode
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = CustomError;
