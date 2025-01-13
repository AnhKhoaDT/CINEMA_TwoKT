const userServices = require('./user.services');
const CustomError = require('../../utils/CustomError');

// User controller

// Get all users
const getAll = async (req, res) => {
    try {
        const users = await userServices.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
         
        if (error.statusCode) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        // Nếu không có statusCode, trả về lỗi server 500
        return res.status(500).json({ error: error.message });
    }
}

// Get user by id
const getById = async (req, res) => {
    try {
        const user = await userServices.getUserById(req.params.id);
        
        res.status(200).json(user);
    } catch (error) {
        
       if(error instanceof CustomError){
           return res.status(error.statusCode).json({error:error.message});
        }
        return res.status(500).json({ error: error.message });
    }
} 

// Create new user

const create = async (req, res) => {
    try {
        const newUser = await userServices.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        if (error instanceof CustomError) {
            
            return res.status(error.statusCode).json({ error: error.message });  // Trả về mã trạng thái và thông báo
        }
       

        // Nếu không có statusCode, trả về lỗi server 500
        return res.status(500).json({ error: error.message });
    }
}

// Update user by id

const updateById = async (req, res) => {
    try {
        const updatedUser = await userServices.updateUserById(req.params.id, req.body);
        res.status(200).json(updatedUser);
    } catch (error) {
        if (error.statusCode) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        // Nếu không có statusCode, trả về lỗi server 500
        return res.status(500).json({ error: error.message });
    }
}

// Delete user by id

const deleteById = async (req, res) => {
    try {
        const deletedUser = await userServices.deleteUserById(req.params.id);
        res.status(200).json(deletedUser);
    } catch (error) {
         
        if (error.statusCode) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        // Nếu không có statusCode, trả về lỗi server 500
        return res.status(500).json({ error: error.message });
    }
}


// Export controller functions
module.exports = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
}
