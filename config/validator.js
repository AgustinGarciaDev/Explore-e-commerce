const Joi = require('joi')
const validator = (req, res, next) => {

    const password = /(?=.*\d)(?=.*[A-z])/

    const name = /^[a-z0-9_-]/

    const schema = Joi.object({

        user: Joi.string().trim().min(4).pattern(new RegExp('[a-zA-z0-9]$')).required().messages({
            'string.min': 'You nick name must have at least 4 letters',
            'string.empty': 'You must complete this field',
            'string.pattern.base': 'The input first name only supports letters and number'
        }),
        email: Joi.string().trim().email().required().messages({
            'string.email': 'Use the format ej: name@example.com',
            'string.empty': 'You must complete this field'
        }),
        password: Joi.string().min(5).trim().required().pattern(new RegExp(password)).messages({
            "string.empty": "You must complete this field",
            "string.min": "Your Password  must have at least 5 characters",
            "string.pattern.base": "Your Password must have at least a letter and a number",
        }),
        urlImg: Joi.string(),
        googleFlag: Joi.boolean()
    })

    const validation = schema.validate(req.body, { abortEarly: false })
    
    if (validation.error) {
        return res.json({ succes: false, error: validation.error })
    }
    next()
}

module.exports = validator