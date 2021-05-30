const nodeMailer = require("nodemailer")

/* dmbcpfuotovymeqz */
let transporter = nodeMailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL ,
    pass: process.env.PASSWORD ,
  },
  
});

module.exports = transporter


