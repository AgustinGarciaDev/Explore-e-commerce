const transporter = require("../config/nodeMailer")
const template = require("../templateSummary")

const SendpurchaseSummary = async (req,res)=>{
    const{ receiver, } = req.body

    try {
       await transporter.sendMail({
        from:"prueba node",
        to: receiver.email,
        subject:"purchase summary",
        html: template({})

        })
        
        res.json({ success:true })
    } catch (error) {
        res.json({ success:false, err:"An error has ocurred" })
    }

}

module.exports={
    SendpurchaseSummary
}
