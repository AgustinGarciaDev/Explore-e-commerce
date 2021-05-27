const express = require("express")
const router = express.Router()
const passport = require("passport")

const { getAllProducts, getProductById, postProduct, deleteProduct, updateProduct, postComment, deleteComment, putComment } = require("../controllers/productsController")
const { newUser, login, relogin } = require("../controllers/userControllers")

router.route("/products")
    .get(getAllProducts)
    .post(postProduct)

router.route("/products/:id")
    .get(getProductById)
    .delete(deleteProduct)
    .put(updateProduct)

router.route("/products/comments/:idProduct")
.post( postComment )

router.route("/products/comments/:idProduct/:idComment")
.delete( deleteComment )
.put( putComment )

// const validator = require("../config/validator")


router.route("/user/signup")
    .post( newUser)


router.route("/user/signin")
    .post( login)

router.route('/user/relogin')
    .get(passport.authenticate('jwt', {session: false}), relogin)
    

module.exports = router
