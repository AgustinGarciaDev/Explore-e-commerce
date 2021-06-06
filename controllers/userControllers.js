const User = require("../models/User")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("express-fileupload")
let cloudinary = require('cloudinary').v2



const userControllers = {
    newUser: async (req, res) => {
        var error
        if (req.files) {

            try {
                const { url } = await cloudinary.uploader.upload(req.files.photo.tempFilePath, { folder: "users", transformation: [{ width: 100, height: 100, gravity: "faces", crop: "thumb" }] })
                req.body.urlImg = url
            } catch (error) {
                console.log(error)
            }
            /*    const file = req.files.photo
               file.mv(`${__dirname}/../build/build/assets/${file.name}`, (error) => {
                   if (!error) {
                       console.log("lo grabe")
                   } else {
                       console.log(error)
                   }
               })
               console.log(req.files) */
        }
        const emailExistent = await User.findOne({ email: req.body.email })
        if (!emailExistent) {
            try {
                const passwordHashed = bcryptjs.hashSync(req.body.password, 10)
                var newUserSaved = await new User({ ...req.body, password: passwordHashed }).save()
                const token = jwt.sign({ ...newUserSaved }, process.env.SECRET_KEY)
                var response = token
            } catch (e) { error = "Hubo un error en el grabado del usuario. Reintente" }
        } else {
            error = "That email is already taken"
        }
        res.json({
            success: !error ? true : false,
            response: !error ? { token: response, img: newUserSaved.urlImg, name: newUserSaved.user, email: newUserSaved.email, admin: newUserSaved.admin } : { error: error }
        })
    },

    login: async (req, res) => {
        const { email, password } = req.body
        const userOK = await User.findOne({ email })
        if (userOK) {
            const passwordOk = bcryptjs.compareSync(req.body.password, userOK.password)
            if (passwordOk) {
                const token = jwt.sign({ ...userOK }, process.env.SECRET_KEY)
                var response = token
            } else { var error = "Users and/or password are incorrect" }
        } else { var error = "Users and/or password are incorrect" }
        res.json({
            success: !error ? true : false,
            response: !error && { token: response, img: userOK.urlImg, user: userOK.user, email: userOK.email, admin: userOK.admin },
            error: error
        })
    },

    relogin: (req, res) => {
        res.json({ success: true, response: { img: req.user.urlImg, user: req.user.user, email: req.user.email, admin: req.user.admin } })
    },

    modifyUser: async (req, res) => {
        const id = req.user._id
        try {
            if (req.body.password) {
                const passwordHashed = bcryptjs.hashSync(req.body.password, 10)
                const userChanged = await User.findOneAndUpdate({ _id: id }, { password: passwordHashed }, { new: true })
                res.json({ success: true, response: userChanged })
            } else {
                const userChanged = await User.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })
                res.json({ success: true, response: userChanged })
            }

            res.json({ success: true, response: userChanged })

        } catch (error) {
            res.json({ success: false, err: "An error has occurred on our server" })
        }
    }

}

module.exports = userControllers