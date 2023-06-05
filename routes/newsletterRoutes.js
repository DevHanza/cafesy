const express = require("express");
const router = express.Router();

const https = require("https");

const emailService = require("./emailService");

// Mailchimp Newsletter Submission

function processSubscription(
  status,
  successTitle,
  successHeading,
  successMessage,
  failureTitle,
  failureHeading,
  res,
  req
) {

  const Userdata = {
    members: [
      {
        email_address: req.body.email,
        status: status,
      },
    ],
    update_existing: true,
  };

  const jsonData = JSON.stringify(Userdata);
  const url = `https://us11.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}`;

  const options = {
    method: "POST",
    auth: `hansana:${process.env.MAILCHIMP_API_KEY}`,
  };

  const request = https.request(url, options, (response) => {
    response.on("data", function (data) {
      // console.log(JSON.parse(data));

      if (response.statusCode === 200) {
        res.render("newsletter-status", {
          title: successTitle,
          heading: successHeading,
          message: successMessage,
          status_icon: "success-tick",
        });

      } else {
        res.render("newsletter-status", {
          title: failureTitle,
          heading: failureHeading,
          message: `ERROR ${response.statusCode} : An error occurred.`,
          status_icon: "failure-cross",
        });
      }
    });
  });

  request.write(jsonData);
  request.end();
}

router.get("/newsletter", (req, res) => {
  res.render("newsletter", {
    title: "Stay Tuned!",
    heading: "Subscribe to Newsletter!",
    btntext: "Let's Go!",
    text: "Wanna Know About Latest Offers & Events? <br>Then Subscribe to our email list and stay updated!",
    form_action: "/subscribe-confirmation",
  });
});

router.get("/unsubscribe", (req, res) => {
  res.render("newsletter", {
    title: "You will be missed!",
    heading: "You will be missed!",
    btntext: "Unsubscribe me!",
    text: "By submitting this form you will be removed from our email list and <br> You will no longer able to hear about our events & offers.",
    form_action: "/unsubscribe-confirmation",
  });
});

// Mailchimp Newsletter Submission - Redirect pages

router.post("/subscribe-confirmation", async (req, res) => {
  processSubscription(
    "subscribed",
    "Hooray! You have successfully subscribed.",
    "Subscribed!",
    "You have successfully subscribed to our email list.",
    "Oops! Something went wrong.",
    "Subscription Failed!",
    res,
    req
  );

  const subscribedUserHTML = `<html><head> <style>a{color: #3C2A21;}.email-title{display: flex; justify-content: center; align-items: center; flex-direction: column; height: 200px; background-color: #1A120B; font-family: Arial, sans-serif; color: #fff;}.email-title .email-logo{height: 40px; margin-bottom: 10px;}.email-title p{font-size: 16px;}.email-content-wrapper{margin: 0 auto; width: 80%; padding: 50px; background-color: #fff; font-size: 18px;}p{font-family: Arial, sans-serif; line-height: 1.5; ;}footer{text-align: center; margin: 15px 0 30px 0; font-family: Arial, sans-serif; color: gray;}@media (max-width: 575.98px){.email-content-wrapper{margin: 0; width: unset;}}</style></head><body> <main> <div class="email-title"> <a href="https://cafesy.onrender.com/"><img class="email-logo" src="https://i.ibb.co/4mwrry0/Cafesy-Logo-Text-with-Icon-White.webp"></a> <p>Connected. Organic. Alive.</p></div><div class="email-content-wrapper"> <p>Hey <b>${req.body.email}</b>! 👋,</p><p>We're thrilled to have you as a new subscriber to our newsletter! 🎉 <br>Get ready for a world of exciting updates, offers, and insights from Cafésy.</p><p>Your privacy is important to us, so rest assured that we'll never share your info with anyone. If you ever change your mind, you can easily <a href="http://cafesy.onrender.com/unsubscribe">unsubscribe</a> at the bottom of our emails.</p><p>Meanwhile, feel free to check out our website <a href="http://cafesy.onrender.com/">Cafesy</a> for additional resources. If you have any questions or need a hand, our friendly <a href="https://cafesy.onrender.com/contact">support</a> team is here for you.</p><p>Thank you for joining our awesome newsletter community! 💌 <br>We're excited to stay connected! </p><br><p>Warm regards,,</p><p>Hansana Dasanayaka<br>Owner & Founder<br>Cafésy<br></p></div></main> <footer>© 2023 <a href="https://cafesy.onrender.com/">Cafésy</a>. All rights reserved.</footer></body></html>`;

  try {
    await emailService.sendEmail(
      req.body.email,
      "Welcome to Cafésy's Newsletter! 💌",
      subscribedUserHTML
    );} 
    
   catch (error) {
    }

});

router.post("/unsubscribe-confirmation", async (req, res) => {
  processSubscription(
    "unsubscribed",
    "Bye Bye! You have successfully unsubscribed.",
    "Unsubscribed!",
    "You have successfully unsubscribed from our email list.",
    "Oops! Something went wrong.",
    "Unsubscription Failed!",
    res,
    req
  );

  const unsubscribedUserHTML = `<html><head> <style>a{color: #3C2A21;}.email-title{display: flex; justify-content: center; align-items: center; flex-direction: column; height: 200px; background-color: #1A120B; font-family: Arial, sans-serif; color: #fff;}.email-title .email-logo{height: 40px; margin-bottom: 10px;}.email-title p{font-size: 16px;}.email-content-wrapper{margin: 0 auto; width: 80%; padding: 50px; background-color: #fff; font-size: 18px;}p{font-family: Arial, sans-serif; line-height: 1.5; ;}footer{text-align: center; margin: 15px 0 30px 0; font-family: Arial, sans-serif; color: gray;}@media (max-width: 575.98px){.email-content-wrapper{margin: 0; width: unset;}}</style></head><body> <main> <div class="email-title"> <a href="https://cafesy.onrender.com/"><img class="email-logo" src="https://i.ibb.co/4mwrry0/Cafesy-Logo-Text-with-Icon-White.webp"></a> <p>Connected. Organic. Alive.</p></div><div class="email-content-wrapper"> <p>Hey <b>${req.body.email}</b>! 👋,</p><p>We're sad to inform you that we've received your request to unsubscribe from our newsletter.</p><p> If there's anything we could have done differently or if you have any feedback for us, we'd genuinely appreciate hearing from you. We're always striving to improve our content and services.</p><p>Although you won't receive our newsletters anymore, remember that you're always welcome to reconnect with us in the future. Our website <a href="http://cafesy.onrender.com/">Cafesy</a> will still be available, offering valuable resources and information about our products & services.</p><p>Thank you for being a part of our newsletter community. We appreciate the time you've spent with us, and we wish you all the best in your endeavors.</p><br><p>Take care,</p><p>Hansana Dasanayaka<br>Owner & Founder<br>Cafésy<br></p></div></main> <footer>© 2023 <a href="https://cafesy.onrender.com/">Cafésy</a>. All rights reserved.</footer></body></html>`;

  try {
    await emailService.sendEmail(
      req.body.email,
      "Sorry to See You Go! 😪",
      unsubscribedUserHTML
    );} 
    
   catch (error) {
    }
});

module.exports = router;
