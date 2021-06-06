const express = require("express")
const router = express.Router()
const passport = require("passport")
const productsValidator = require('../config/productsValidator')
const validator = require("../config/validator")
const validatorChangeUsers = require("../config/validatorChangeUsers")

const { getAllProducts, getProductById, postProduct, deleteProduct,
    updateProduct, postComment, deleteComment, putComment,
    postScore, deleteScore, putScore,
    postPhotos, deletePhotos, putPhotos, editCategory, imagesActions } = require("../controllers/productsController")

const { newUser, login, relogin, modifyUser } = require("../controllers/userControllers")

const { SendpurchaseSummary, sendDiscount } = require("../controllers/mailerController")

router.route("/products")
    .get(getAllProducts)
    .post(passport.authenticate("jwt", { session: false }), productsValidator, postProduct)

router.route("/products/:id")
    .get(getProductById)
    .delete(passport.authenticate("jwt", { session: false }), deleteProduct)
    .put(passport.authenticate("jwt", { session: false }), updateProduct)

/*-----------------Comments----------------------------  */
router.route("/products/comments/:idProduct")
    .post(passport.authenticate("jwt", { session: false }), postComment)

router.route("/products/comments/:idProduct/:idComment")
    .delete(deleteComment)
    .put(putComment)

/* --------------------Scores------------------------------ */
router.route("/products/score/:idProduct")
    .post(passport.authenticate("jwt", { session: false }), postScore)

router.route("/products/score/:idProduct/:idScore")
    .delete(passport.authenticate("jwt", { session: false }), deleteScore)
    .put(passport.authenticate("jwt", { session: false }), putScore)

/*----------------Categories---------------------------------  */

router.route("/products/categories/:idProduct")
    .put(passport.authenticate("jwt", { session: false }), editCategory)

/*----------------Photos--------------------------------------- */

router.route("/products/photos/:idProduct")
    .post(passport.authenticate("jwt", { session: false }), postPhotos)

router.route("/products/photos/:idProduct/:idPhoto")
    .delete(passport.authenticate("jwt", { session: false }), deletePhotos)
    .put(passport.authenticate("jwt", { session: false }), putPhotos)


/* ----------Envio de images--------------- */

router.route("/products/images/:idProduct")
    .put(passport.authenticate("jwt", { session: false }), imagesActions)

/*---------- Envio de email----------------- */

router.route("/mails/sendSumary")
    .post(SendpurchaseSummary)
// const validator = require("../config/validator")

router.route("/mails/sendDiscount")
    .post(sendDiscount)

router.route("/user/signup")
    .post(validator, newUser)


router.route("/user/signin")
    .post(login)

router.route('/user/relogin')
    .get(passport.authenticate('jwt', { session: false }), relogin)

router.route("/user/modifyuser/:id")
    .put(passport.authenticate('jwt', { session: false }), validatorChangeUsers, modifyUser)

module.exports = router
