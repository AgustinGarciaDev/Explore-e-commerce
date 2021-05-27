const express = require("express")
const router = express.Router()
const userControllers = require("../controllers/userControllers")
const passport = require("passport")
const productsValidator = require('../config/productsValidator')

const { getAllProducts, getProductById, postProduct, deleteProduct, updateProduct, postComment, deleteComment, putComment } = require("../controllers/productsController")

router.route("/products")
    .get(getAllProducts)
    .post(productsValidator, postProduct)

router.route("/products/:id")
    .get(getProductById)
    .delete(deleteProduct)
    .put(updateProduct)

router.route("/products/comments/:idProduct")
    .post(postComment)

router.route("/products/comments/:idProduct/:idComment")
    .delete(deleteComment)
    .put(putComment)

// const validator = require("../config/validator")


router.route("/user/signup")
    .post(userControllers.newUser)


router.route("/user/signin")
    .post(userControllers.login)

module.exports = router
