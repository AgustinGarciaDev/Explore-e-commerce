const mongoose = require("mongoose")

const ProductScheme = new mongoose.Schema({

    coverImage: { type: String, required: true },
    productsImages: [{ photo: { type: String, required: true } }],
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    categories: [{ name: { type: String, required: true } }],
    name: { type: String, required: true },
    opinion: { type: [{ comment: String, score: Number, userId: mongoose.Types.ObjectId }] },
    brand: { type: String, required: true }
})

module.exports = mongoose.model("Product", ProductScheme)