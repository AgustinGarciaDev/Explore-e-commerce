const mongoose = require("mongoose")

const ProductScheme = new mongoose.Schema({
    coverImage: { type: String, required: true },
    productsImages: [{ photo: { type: String, required: true } }],
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    discount: { type: Number, required: true },
    stock: { type: Number, required: true },
    categories: [{ name: { type: String, required: true } }],
    name: { type: String, required: true },
    comments: { type: [{ comment: { type: String }, userId: { type: mongoose.Types.ObjectId, ref: "user" } }] },
    scores: { type: [{ score: { type: Number }, userId: { type: mongoose.Types.ObjectId, ref: "user" } }] },
    brand: { type: String, required: true }
})

module.exports = mongoose.model("Product", ProductScheme)