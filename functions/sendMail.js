const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service:'gmail',
      auth: {
        user: "sharmadks17@gmail.com", // generated ethereal user
        pass: 'qzrktikwdsxtzeff'
      },
});


const sendMail = async function(email, verificationLink){
    console.log("I am called", email)

       // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "sharmadks17@gmail.com",
    to: email, // list of receivers
    subject: "Verify Your account", // Subject line
    text: "If this email was not intended for you feel free to delete it", 
    html: `<h2>Thanks for signing up on Project Store</h2>
     Go to the below link for verification ${verificationLink}`, 
  });

  console.log("Email sent done from  me")
}

module.exports={
    sendMail
}