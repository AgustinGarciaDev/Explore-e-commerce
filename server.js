require('dotenv').config()
const express = require("express")
const cors = require("cors")
const router = require("./routes/index")
const passport = require ("passport")
const fileUpload = require("express-fileupload")
const cloudinary = require('cloudinary').v2
require("./config/database")
require("./config/passport")

const app = express()

/* sfsdfsdfsdfsdf */


app.use(cors())
app.use(express.json())
app.use( fileUpload({ useTempFiles: true }) )
app.use("/api", router)

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET  
})

const port = process.env.PORT

const host = process.env.HOST || "0.0.0.0"

app.listen( port, host, ()=>console.log( "app listening on port" + port + " on " + host  ) )


