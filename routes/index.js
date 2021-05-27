const express = require("express")
const router = express.Router()
const passport = require("passport")
const productsValidator = require('../config/productsValidator')

<<<<<<< HEAD
const { getAllProducts, getProductById, postProduct, deleteProduct, 
        updateProduct, postComment, deleteComment, putComment,
        postScore, deleteScore, putScore } = require("../controllers/productsController")
=======
const { getAllProducts, getProductById, postProduct, deleteProduct, updateProduct, postComment, deleteComment, putComment } = require("../controllers/productsController")
const { newUser, login, relogin } = require("../controllers/userControllers")
>>>>>>> b7803f7ce78eceda522902c52134cd70689b577f

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
    .post( newUser)


router.route("/user/signin")
    .post( login)

router.route('/user/relogin')
    .get(passport.authenticate('jwt', {session: false}), relogin)
    

module.exports = router
