const express = require("express")
const cors = require("cors")
const router = require("./routes/index")
require(".config/database")

const app = express()


app.use(cors())
app.use(express.json())




app.listen(400, ()=>console.log( "app listening on port 4000" ) )


