const SibApiV3Sdk = require('sib-api-v3-sdk');

const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY; 

const sendEmail = async (to, subject, htmlContent) => {
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.to = [{ email: to }];
  sendSmtpEmail.sender = { name: "Cafésy", email: "no-reply-example@cafesy.lk" };
  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = htmlContent;

  try {
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email: ', error);
  }
};

module.exports = { sendEmail };
