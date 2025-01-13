const validateParams = (schema, name) => {
    return (req, res, next) => {
        const result = schema.validate({ param: req['params'][name] });
        if (result.error) {
            return res.status(400).json({
                message: "Invalid parameter",
                details: result.error.details.map((err) => err.message)
            });
        } else {
            req.value = req.value || {};
            req.value.params = req.value.params || {};
            req.value.params[name] = result.value.param;
            next();
        }
    };
};

const validateBody = (schema) => {
    return (req, res, next) => {
        const result = schema.validate(req.body);
        if (result.error) {
            return res.status(400).json({
                message: "Invalid body data",
                details: result.error.details.map((err) => err.message)
            });
        } else {
            req.value = req.value || {};
            req.value.body = result.value;
            next();
        }
    };
};

module.exports = {
    validateParams,
    validateBody
};
