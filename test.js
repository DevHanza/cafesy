function processSubscription(
  status,
  successTitle,
  successMessage,
  failureTitle,
  failureMessage,
  res
) {
  const email = req.body.email;

  const Userdata = {
    members: [
      {
        email_address: email,
        status: status,
      },
    ],
  };

  const jsonData = JSON.stringify(Userdata);
  const url = `https://us11.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}`;

  const options = {
    method: "POST",
    auth: `hansana:${process.env.MAILCHIMP_API_KEY}`,
  };

  const request = https.request(url, options, (response) => {
    response.on("data", function (data) {
      console.log(JSON.parse(data));

      if (response.statusCode === 200) {
        res.render("newsletter-status", {
          title: successTitle,
          heading: successTitle,
          message: successMessage,
          status_icon: "success-tick",
        });
      } else {
        res.render("newsletter-status", {
          title: failureTitle,
          heading: successTitle,
          message: `${failureMessage} ${response.statusCode}: An error occurred.`,
          status_icon: "failure-cross",
        });
      }
    });
  });

  request.write(jsonData);
  request.end();
}

processSubscription(
  "unsubscribed",
  "Unsubscribed Successfully",
  "You have successfully unsubscribed from our email list.",
  "Oops! Something went wrong.",
  "Unsubscription failed!",
  res
);

processSubscription(
  "subscribed",
  "Hooray!🎉 You have successfully subscribed.",
  "You have successfully subscribed to our email list.",
  "Oops! Something went wrong.",
  "Subscription failed!",
  res
);
