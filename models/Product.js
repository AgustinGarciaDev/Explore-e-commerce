const mongoose = require("mongoose")

const ProductScheme = new mongoose.Schema({

    coverImage:{ type: String, required:true },
    productsImages:{ type:[ String ], required:true },
    description:{ type:String, required:true },
    price:{ type:Number, required:true },
    categories:{ type:[ String ] },
    name: { type:String, required:true },
    comments:{ type:[{ comment:{ type :String}, userId:{ type:mongoose.Types.ObjectId, ref:"user" }  }] },
    scores:{ type:[{ score:{ type:Number }, userId:{ type: mongoose.Types.ObjectId, ref:"user" } }] },
    brand:{ type:String, required:true }
})

module.exports = mongoose.model("Product",ProductScheme) 