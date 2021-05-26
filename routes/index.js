const express = require("express")
const router = express.Router()
const userControllers = require("../controllers/userControllers")
const passport = require("passport")
const validator = require("../config/validator")


router.route("/user/signup")
.post(userControllers.newUser)


router.route("/user/signin")
.post(userControllers.login)

module.exports = router