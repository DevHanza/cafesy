const express = require("express");
const router = express.Router();

const SibApiV3Sdk = require("sib-api-v3-sdk");
const defaultClient = SibApiV3Sdk.ApiClient.instance;

const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

const adminEmail = "hansana123dasanayake@gmail.com";

router.get("/", (req, res) => {
  res.render("contact");
});

router.post("/", (req, res) => {
  // User Email

  const sendEmailtoUser = new SibApiV3Sdk.SendSmtpEmail();

  sendEmailtoUser.subject = "Thank You for Reaching Out to Cafesy!";
  // sendEmailtoUser.htmlContent = `Hello ${req.body.userName}!👋 \n Here is the data you submitted: ${req.body.userMessage} \n${req.body.userEmail} \n${req.body.userPhone} \n${req.body.userName} \n`;
  sendEmailtoUser.htmlContent = `<html><head> <style>a{text-decoration: none;}.email-title{display: flex; justify-content: center; align-items: center; flex-direction: column; height: 200px; background-color: #1A120B; font-family: Arial, sans-serif; color: #fff;}.email-title .email-logo{height: 40px; margin-bottom: 10px;}.email-title p{font-size: 16px;}.email-content-wrapper{margin: 0 auto; width: 80%; padding: 50px; background-color: #fff; font-size: 18px;}p{font-family: Arial, sans-serif; ;}footer{text-align: center; margin: 15px 0 30px 0; font-family: Arial, sans-serif; color: gray;}@media (max-width: 575.98px){.email-content-wrapper{margin: 0; width: unset;}}</style></head><body> <main> <div class="email-title"> <a href="#"><img class="email-logo" src="https://i.ibb.co/4mwrry0/Cafesy-Logo-Text-with-Icon-White.webp"></a> <p>Connected. Organic. Alive.</p></div><div class="email-content-wrapper"> <p><b>Dear ${req.body.userName},</b></p><p>Thank you for submitting your inquiry through our contact form on Cafesy. We appreciate your interest in our products/services and are eager to assist you.</p><p>Our team is currently reviewing your message, and we will get back to you within 24-48 hours. In the meantime, we encourage you to explore our website further and check out our social media channels for the latest updates, tips, and insights.</p><p>If you have any urgent questions or concerns, please don't hesitate to reach out to our customer support team at justaexample@cafesy.lk or give us a call at +94 123 456 789. We're here to help!</p><p>Once again, thank you for reaching out to us. We look forward to providing you with the information and assistance you need. </p><p>Best regards,</p><p>Hansana Dasanayaka<br>Owner & Founder<br>Cafésy<br><br>+94 123 456 789<br>justaexample@cafesy.lk<br><br>Thank You! 🤗 </p></div></main> <footer>© 2023 <a href="#">Cafésy</a>. All rights reserved.</footer></body></html>`;
  sendEmailtoUser.sender = {
    name: "Cafésy",
    email: "no-reply-example@cafesy.lk",
  };
  sendEmailtoUser.to = [{ email: req.body.userEmail }];

  apiInstance.sendTransacEmail(sendEmailtoUser).then(
    function (data) {
      console.log(
        "Email to User Sent!. Returned data: " + JSON.stringify(data)
      );

      res.render("newsletter-status", {
        title: "We will back to you soon! ",
        heading: "Email Sent!",
        message: "Thank you for contacting us! We'll get back to you soon.",
        status_icon: "success-tick",
      });
    },
    function (error) {
      res.render("newsletter-status", {
        title: "Oops! Something went wrong!",
        heading: "Email Sent Failed!",
        message: `ERROR ${response.statusCode} : An error occurred.`,
        status_icon: "failure-cross",
      });

      console.error(error);
    }
  );

  // Administrator Email


  setTimeout(function(){

  const sendEmailtoAdmin = new SibApiV3Sdk.SendSmtpEmail();

  sendEmailtoAdmin.subject = "New Contact Form Submission!";
  sendEmailtoAdmin.htmlContent = `<html><head> <style>a{text-decoration: none;}.email-content-wrapper{margin: 0 auto; width: 80%; padding: 50px; background-color: #fff; font-size: 18px;}p{font-family: Arial, sans-serif; color: black;}footer{text-align: center; margin: 15px 0 30px 0; font-family: Arial, sans-serif; color: gray;}@media (max-width: 575.98px){.email-content-wrapper{margin: 0; width: unset;}}</style></head><body> <main> <div class="email-content-wrapper"> <h2><u>New Contact Form Submission</u></h2> <p><b>- Phone:</b> ${req.body.userPhone}</p><p><b>- Email:</b> ${req.body.userEmail}</p><p><b>- Name:</b> ${req.body.userName}</p><p><b>- Message:</b> ${req.body.userMessage}</p></div></main> <footer>© 2023 <a href="#">Cafésy</a>. All rights reserved.</footer></body></html>`;
  sendEmailtoAdmin.sender = { name: "Cafésy", email: "submissions@cafesy.lk" };
  sendEmailtoAdmin.to = [{ email: adminEmail }];


apiInstance.sendTransacEmail(sendEmailtoAdmin).then(
  function (data) {
    console.log(
      "Email to Admin Sent!. Returned data: " + JSON.stringify(data)
    );
  },

  function (error) {
    console.error(error);
  }
);


  }, 2000); 


  
});

module.exports = router;
