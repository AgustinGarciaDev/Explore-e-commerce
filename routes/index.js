const express = require("express")
const router = express.Router()
const userControllers = require("../controllers/userControllers")
const passport = require("passport")
const productsValidator = require('../config/productsValidator')

const { getAllProducts, getProductById, postProduct, deleteProduct, 
        updateProduct, postComment, deleteComment, putComment,
        postScore, deleteScore, putScore } = require("../controllers/productsController")

router.route("/products")
    .get(getAllProducts)
    .post(productsValidator, postProduct)

router.route("/products/:id")
    .get(getProductById)
    .delete(deleteProduct)
    .put(updateProduct)

/*-----------------Comments----------------------------  */   
router.route("/products/comments/:idProduct")
    .post(postComment)

router.route("/products/comments/:idProduct/:idComment")
    .delete(deleteComment)
    .put(putComment)

/* --------------------Scores------------------------------ */
router.route("/products/score/:idProduct")
.post( postScore )

router.route("/products/score/:idProduct/:idScore")
.delete( deleteScore )
.put( putScore )



// const validator = require("../config/validator")


router.route("/user/signup")
    .post(userControllers.newUser)


router.route("/user/signin")
    .post(userControllers.login)

module.exports = router
