const mongoose = require ("mongoose")

const userScheema = mongoose.Schema({
    user: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    legalAge:{type: Boolean,  required: true},
    urlImg: {type: String},
    whishList:[{itemId: {type: mongoose.Types.ObjectId, ref: "direction"}}],
    likes: [{itemId: {type: mongoose.Types.ObjectId, ref: "direction"}}],
    dataBuy:[{direction:{type: String},directionNumber:{type: String},postalCode:{type: String},country:{type: String}}],
    admin:{type: Boolean, default:false},
    googleFlag:{type: Boolean, default:false}
  }) 

const User = mongoose.model("user", userScheema)

module.exports = User
