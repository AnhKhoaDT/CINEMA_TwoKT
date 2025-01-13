const Joi = require('joi');

const userSchema = Joi.object().keys({
        name: Joi.string().required().messages({ 'any.required': 'Name is required' }), // the name must be a string
        dob: Joi.date()
            .min('1950-01-01') // the date of birth must be greater than or equal to 1950-01-01
            .max(new Date) // the date of birth must be less than or equal to the current date
            .required()
            .messages({
                'date.min': 'Date of birth must be greater than or equal to 1950-01-01',
                'date.max': 'Date of birth must be less than or equal to the current date',
                'any.required': 'Date of birth is required'
            }),
        phone: Joi.string().pattern(/^[0-9]{10}$/).required()
            .messages({
                'string.pattern.base': 'Phone number must be a string of 10 digits',
                'any.required': 'Phone number is required'
            }), // the phone number must be a string of 10 digits
        email: Joi.string().email().required(), // the email must be a valid email
        username: Joi.string()
            .alphanum()// the username must be a string of alphanumeric characters with a length between 3 and 30
            .min(3)
            .max(30)
            .required()
            .messages({
                'string.alphanum': 'Username must only contain alphanumeric characters ',
                'string.min': 'Username must have a minimum length of 3 characters',
                'string.max': 'Username must have a maximum length of 30 characters',
                'any.required': 'Username is required'
            }), 
        password: Joi.string()
            .min(8) // the password must have a minimum length of 8 characters
            .max(100) // the password must have a maximum length of 100 characters
            .required()
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
            .messages({
                'string.pattern.base':
                    'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character',
                'string.min': 'Password must have a minimum length of 8 characters',
                'string.max': 'Password must have a maximum length of 100 characters',
                'any.required': 'Password is required'
            }),
});

module.exports = {
    userSchema,
}