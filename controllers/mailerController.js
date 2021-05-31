const transporter = require("../config/nodeMailer")
const template = require("../templateSummary")

const SendpurchaseSummary = async (req,res)=>{
    const{ form, creditCard } = req.body

    
    try {
       await transporter.sendMail({
        from:"Explore",
        to: form.email,
        subject:"purchase summary",
        html: template( form, creditCard, products =[] )

        })
        
        res.json({ success:true })
    } catch (error) {
        console.log( error )
        res.json({ success:false, err:"An error has ocurred" })
    }

}

module.exports={
    SendpurchaseSummary
}
