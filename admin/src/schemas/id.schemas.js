const Joi = require('joi');

const idSchema = Joi.object().keys({
    param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
            .messages({
                'any.required': 'Id is required,',
                'string.pattern.base': 'Id must be a string of 24 characters and not contain any special characters'
                
             })
});

module.exports = {
    idSchema,
}