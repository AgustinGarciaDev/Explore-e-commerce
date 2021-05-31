const Joi = require('joi')
const validator = (req, res, next) => {

    const schema = Joi.object({

        user: Joi.string().trim().min(4).pattern(new RegExp('[a-zA-z0-9]$')).required().messages({
            'string.min': 'You nick name must have at least 4 letters',
            'string.empty': 'Your user name is a required field',
            'string.pattern.base': 'The input first name only supports letters and number'
        }),
        email: Joi.string().trim().required().email().messages({
            'string.empty': 'Your mail address is a required field',
        }),
        password: Joi.string().trim().min(6).required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){6,15}$/).messages({
            'string.min': 'Your passwrod must contain at least 6 characters',
            'string.empty': 'Your password is a required field',
            'string.pattern.base': 'Your password must contain at least one uppercase and lowercase letter, a special character and a number'
        }),

    }).unknown(true)
    const validation = schema.validate(req.body, { abortEarly: false })

    if (validation.error) {
        return res.json({ success: false, errores: validation.error })
    }
    next()
}

console.log(validator)



module.exports = validator