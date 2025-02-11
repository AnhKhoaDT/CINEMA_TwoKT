const express = require('express');
const router = express.Router();

const { validateParams, validateBody } = require('../../middleware/validation.js'); // Import validation middleware
const { userSchema } = require('../../schemas/user.schemas.js'); // Import user schema
const {idSchema} = require('../../schemas/id.schemas.js'); // Import id schema

// Import user controller
const {getAll,getById,create,updateById,deleteById} = require('./user.controller.js');

// User routes
router.route('/')
    .get(getAll)
    .post(validateBody(userSchema), create);

router.route('/:id')
    .get(validateParams(idSchema,"id"), getById)
    .put([validateParams(idSchema,"id"), validateBody(userSchema)], updateById)
    .delete(validateParams(idSchema,"id"), deleteById);


module.exports = router;