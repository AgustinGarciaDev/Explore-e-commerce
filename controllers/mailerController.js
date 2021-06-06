const transporter = require("../config/nodeMailer")
const template = require("../templateEmail/templateSummary")

const SendpurchaseSummary = async (req,res)=>{
    const{ form, creditCard, cart } = req.body
    
    try {
       await transporter.sendMail({
        from:"Explore",
        to: form.email,
        subject:"purchase summary",
        html: template( form, creditCard, cart )

        })
        
        res.json({ success:true })
    } catch (error) {
        console.log( error )
        res.json({ success:false, err:"An error has ocurred" })
    }

}

const sendDiscount = async (req,res)=>{
    const{ mail } = req.body
    try {
        await transporter.sendMail({
         from:"Explore",
         to: mail.email,
         subject:"Discount",
         text: 'Thank you for trusting us!',
         html: '<img src="https://tingarciadg.com/wp-content/uploads/2021/06/explore.jpg" alt="asd" />',
 
        }) 
         res.json({ success:true })
     } catch (error) {
         console.log( error )
         res.json({ success:false, err:"An error has ocurred" })
     }
}



module.exports={
    SendpurchaseSummary,
    sendDiscount
}
