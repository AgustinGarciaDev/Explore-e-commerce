const mongoose = require("mongoose")

const userScheema = mongoose.Schema({
  user: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  urlImg: { type: String },
  whishList: [{ itemId: { type: mongoose.Types.ObjectId, ref: "Product" } }],
  likes: [{ itemId: { type: mongoose.Types.ObjectId, ref: "Product" } }],
  dataBuy: [{ direction: { type: String }, directionNumber: { type: String }, postalCode: { type: String }, country: { type: String } }],
  admin: { type: Boolean, default: false },
  googleFlag: { type: Boolean, default: false }
})

const User = mongoose.model("user", userScheema)

module.exports = User
