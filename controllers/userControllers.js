const User = require ("../models/User")
const bcryptjs = require ("bcryptjs")
const jwt = require("jsonwebtoken")



const userControllers={
    newUser: async (req, res) => {
        var error
        const emailExistent = await User.findOne({...req.body.email})    
        if (!emailExistent) {
            try {
                const passwordHashed= bcryptjs.hashSync(req.body.password,10)
                var newUserSaved = await new User ({...req.body,password: passwordHashed}).save() 
                const token = jwt.sign({...newUserSaved},process.env.SECRET_KEY)
                var response = token
            } catch (e) {error = "Hubo un error en el grabado del usuario. Reintente"}                  
       } else {error = "That email is already taken"}      
       res.json({
        success: !error ? true : false,
        response: {token: response, img: newUserSaved.urlImg, name:newUserSaved.user ,  email:newUserSaved.email }, error: error,})   
    },
   
    login:async (req,res)=>{
        const {email, password} = req.body
        console.log(req.body)
        const userOK = await User.findOne({email})
        console.log(userOK,"1")
        if (userOK) {
            console.log(req.body,"2")
            const passwordOk = bcryptjs.compareSync(req.body.password, userOK.password)
            if (passwordOk) {
                const token = jwt.sign({...userOK}, process.env.SECRET_KEY)
                var response = token
            } else { var error = "Users and/or password are incorrect"}           
        } else { var error = "Users and/or password are incorrect"}      
        res.json({
            success: !error ? true : false,
            response: !error && {token: response, img: userOK.urlImg, user: userOK.user, email: userOK.email },
            error: error
        })
    },
   
    relogin: (req, res) => {        
          res.json({success: true, response:{img: req.user.urlImg, user: req.user.user, email: req.user.email}})
    },

   
    
    uploadPhoto: async (req,res)=>{

        console.log(req.files.photo)

    //     cloudinary.config({ 
    //         cloud_name : 'dvh9yxfgi' , 
    //         api_key : '547514222417516' , 
    //         api_secret : 'FnGih22hdSCaHVD-4ebA5e-CVhk'  
    //     })
    
    //    const { url } = await cloudinary.uploader.upload( req.files.photo , {width: 100, height: 100, gravity: "faces", crop: "thumb"} )
    //    console.log(url)
    //    console.log("hola2")
    
    }

}

module.exports = userControllers