const mongoose = require("mongoose")

const ProductScheme = new mongoose.Schema({

    coverImage:{ type: String, required:true },
    productsImages:{ type:[ String ], required:true },
    description:{ type:String, required:true },
    price:{ type:Number, required:true },
    categories:{ type:[ String ] },
    name: { type:String, required:true },
    opinion:{ type:[{ title:String, comment:String, score:Number, userId: mongoose.Types.ObjectId }] },
    brand:{ type:String, required:true }
})

module.exports = mongoose.model("Product",ProductScheme) 