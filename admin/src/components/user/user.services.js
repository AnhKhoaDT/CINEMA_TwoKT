//user services
const User = require('./user.model');
const bcrypt = require('bcrypt');

const CustomError = require('../../utils/CustomError');


// Get all users
const getAllUsers = async () => {
    try {
        return await User.find();
    } catch (error) {
        throw new Error(error);
    }
};

// Get user by id
const getUserById = async (id) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            throw new CustomError('User not found', 404);
        }
        return user;
    } catch (error) {
        if (error instanceof CustomError) {
            throw error;
        }

        throw new Error(error);
    }
}

// Create new user

const createUser = async (user) => {
    try {
        const newUser = new User(user);

        //check if the user already exists
        const existingEmail = await User
            .findOne({ email: newUser.email });
        if (existingEmail) {
           throw new CustomError('Email already exists', 409);
        }

        const existingPhone = await User
            .findOne({ phone: newUser.phone });
        if (existingPhone) {
            throw new CustomError('Phone already exists', 409);
        }

        const existingUsername = await User
            .findOne({ username: newUser.username });
        if (existingUsername) {
            const error = new Error('Username already exists');
            error.statusCode = 409;
            throw error;
        }

        return await newUser.save();
    } catch (error) {

       if (error instanceof CustomError) {
            throw error;
        }
        throw new Error(error);
    }
}

// Update user by id

const updateUserById = async (id, updatedUser) => {
    try {
        // check if the user already exists
        const existingEmail = await User
            .findOne({ email: updatedUser.email });
        if (existingEmail && existingEmail._id != id) {
            throw new customError('Email already exists', 409);
        }

        const existingPhone = await User
            .findOne({ phone: updatedUser.phone });
        if (existingPhone && existingPhone._id != id) {
           throw new CustomError('Phone already exists', 409);
        }

        const existingUsername = await User
            .findOne({ username: updatedUser.username });
        if (existingUsername && existingUsername._id != id) {
            throw new CustomError('Username already exists', 409);
        }

        return await User.findByIdAndUpdate
            (id, updatedUser, { new: true });
    }
    catch (error) {
        if (error instanceof CustomError) {
            throw error;
        }
        throw new Error(error);
    }
}

// Delete user by id

const deleteUserById = async (id) => {
    try {
        return await User.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(error);
    }
}

// Compare password

const comparePassword = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        throw new Error(error);
    }
}



module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    comparePassword
};