const nodemailer=require('nodemailer');

const sendemail =async(req, res) => {
  
  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,  
    service: 'Gmail',
    auth: {
     user: 'user@gmail.com',
     pass: '***'
    }
 });
 
 var mailOptions = {
   from: "usfer@gmail.com",
   to: "dev@gmail.com",
   subject: 'send mail',
   text: 'Your text is here'
 };
 var status = transporter.sendMail(mailOptions, function(error, info){
    console.log('info...',info);
    if (error) {
       console.log(error);       
    } else {
       console.log('Email sent: ' + info.response);      
   }
 });
};

module.exports = { sendemail };
