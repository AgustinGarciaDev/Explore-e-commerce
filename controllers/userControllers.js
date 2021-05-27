const User = require ("../models/User")
const bcryptjs = require ("bcryptjs")
const jwt = require("jsonwebtoken")



const userControllers={
    newUser: async (req, res) => {
        var error
        var {user,email,urlImg,legalAge,password} = req.body 

        const emailExistent = await User.findOne({email})
        
        if (!emailExistent) {
            try {
                const passwordHashed= bcryptjs.hashSync(password,10)
                console.log(user,email,urlImg,age,password)
                console.log("hola")
                console.log(req.body)
                var newUserToAdd = new User ({user,email,urlImg,legalAge,password: passwordHashed})  
                var newUserSaved = await newUserToAdd.save() 
                const token = jwt.sign({...newUserSaved},process.env.SECRET_KEY)
                var response = token
            } catch (e){
                error = "Hubo un error en el grabado del usuario. Reintente"
            }                  
       } else {
           error = "That email is already taken"
       }
  
      
       res.json({
        success: !error ? true : false,
        response: {token: response, img: newUserSaved.urlImg, name: newUserSaved.firstName ,  email: newUserSaved.email },
        error: error,
    })   
    },

    login:async (req,res)=>{
        const {email, password} = req.body
        var response;
        var error;  
        const userOK = await User.findOne({email: email})
        if (userOK) {
            const passwordOk = bcryptjs.compareSync(password, userOK.password)
            if (passwordOk) {
                const token = jwt.sign({...userOK}, process.env.SECRET_KEY)
                response = token
            } else {
                error = "Users and/or password are incorrect"
            }           
        } else {
            error = "Users and/or password are incorrect"
        }      
        res.json({
            success: !error ? true : false,
            response: !error && {token: response, img: userOK.urlImg, name: userOK.firstName, email: userOK.email },
            error: error
        })
    },
    relogin: (req, res) => {
        
          res.json({
          success: true, 
          response: {img: req.user.urlImg, name: req.user.firstName, email: req.user.email}
    })
    },

}

module.exports = userControllers