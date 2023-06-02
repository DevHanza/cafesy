const express = require("express");
const router = express.Router();

const https = require("https");

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
  const email = req.body.email;

  const Userdata = {
    members: [
      {
        email_address: email,
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

router.post("/subscribe-confirmation", (req, res) => {
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
});

router.post("/unsubscribe-confirmation", (req, res) => {
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
});

module.exports = router;
