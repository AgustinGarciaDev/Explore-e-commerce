const express = require("express")
const router = express.Router()
const passport = require("passport")
const productsValidator = require('../config/productsValidator')

const { getAllProducts, getProductById, postProduct, deleteProduct,
    updateProduct, postComment, deleteComment, putComment,
    postScore, deleteScore, putScore, pruebaHosteo, editCategory, imagesActions } = require("../controllers/productsController")

const { newUser, login, relogin } = require("../controllers/userControllers")

router.route("/products")
<<<<<<< HEAD
    .get(getAllProducts)
    .post(productsValidator, postProduct)
=======
.get(getAllProducts)
.post(/* productsValidator, */ postProduct)
>>>>>>> ecdfd285b93738012f033bef55bacfe0fba3cdd8

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
.post(postScore)

router.route("/products/score/:idProduct/:idScore")
    .delete(deleteScore)
    .put(putScore)

/*----------------Categories---------------------------------  */

router.route("/products/categories/:idProduct")
    .put(editCategory)

/*----------------Images---------------------------------  */

router.route("/products/images/:idProduct")
    .put(imagesActions)

// const validator = require("../config/validator")


router.route("/user/signup")
    .post(newUser)


router.route("/user/signin")
    .post(login)

router.route('/user/relogin')
    .get(passport.authenticate('jwt', { session: false }), relogin)

router.route("/user/uploadPhoto")
    .post(uploadPhoto)

module.exports = router
