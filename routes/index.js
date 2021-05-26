const express = require("express")
const router = express.Router()
const userControllers = require("../controllers/userControllers")
const passport = require("passport")

const { getAllProducts, getProductById, postProduct, deleteProduct, updateProduct } = require("../controllers/productsController")


router.route("/products")
    .get(getAllProducts)
    .post(postProduct)

router.route("/products/:id")
    .get(getProductById)
    .delete(deleteProduct)
    .put(updateProduct)

// const validator = require("../config/validator")


router.route("/user/signup")
    .post(userControllers.newUser)


router.route("/user/signin")
    .post(userControllers.login)

module.exports = router
