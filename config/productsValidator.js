const joi = require('joi')

const validator = (req, res, next) => {

    const namesRegExp = `^[a-zA-Z_ -]*`

    const objectSchema = joi.object({
        name: joi.string().min(1).required(),
    }).required();

    const imageSchema = joi.object({
        photo: joi.string().min(1).required(),
    }).required();

    const schema = joi.object({

        coverImage: joi.string().trim().required().messages({
            'string.empty': 'You must complete this field'
        }),
        productsImages: joi.array().items(imageSchema).min(1).unique().required().messages({
            'array.min': 'You must add at least one image'
        }),
        description: joi.string().trim().required().pattern(new RegExp(namesRegExp)).messages({
            'string.empty': 'You must complete this field'
        }),
        price: joi.number().required().messages({
            'string.empty': 'You must complete this field',
            'number.base': 'You must complete this field'
        }),
        discount: joi.number().required().messages({
            'string.empty': 'You must complete this field',
            'number.base': 'You must complete this field'
        }),
        stock: joi.number().required().messages({
            'string.empty': 'You must complete this field',
            'number.base': 'You must complete this field'
        }),
        categories: joi.array().items(objectSchema).min(1).unique().required().messages({
            'array.min': 'You must add at least one caregory'
        }),
        comments: joi.array(),
        scores: joi.array(),
        name: joi.string().trim().required().pattern(new RegExp(namesRegExp)).messages({
            'string.empty': 'You must complete this field'
        }),
        brand: joi.string().trim().required().pattern(new RegExp(namesRegExp)).messages({
            'string.empty': 'You must complete this field'
        }),
    })

    let validation

    if( req.files ){
        validation = schema.validate( JSON.parse( req.body.form ) , { abortEarly: false })
        
    }else{ validation = schema.validate(req.body, { abortEarly: false }) }

    

    if (validation.error) {
        return res.json({ success: false, error: validation.error })
    }
    next()
}

module.exports = validator