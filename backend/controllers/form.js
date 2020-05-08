const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.contactForm = (req, res) => {
  const { email, name, message } = req.body;

  const msg = {
    to: process.env.EMAIL_TO,
    from: email,
    subject: `Contact Form  -${process.env.APP_NAME}`,
    text: `Email received from contact from \n Sender name: ${name}\n Sender Email: ${email}\n Sender Message:${message}`,
    html: `
          <h4> Email Received from contact : </h4>
          <p> Sender name: ${name}</p>
          <p> Sender email: ${email}</p>
          <p>Sender message: ${message}</p>
          <hr/>
          <p> This email may contain sensitive information </p>
          <p>https://something.com.np</p>
      `,
  };

  (async () => {
    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  })();
};

exports.contactBlogAuthorForm = (req, res) => {
  const { authorEmail, email, name, message } = req.body;

  let mailList = [authorEmail, process.env.EMAIL_TO];

  const emailData = {
    to: mailList,
    from: email,
    subject: `Someone Messaged you Form  -${process.env.APP_NAME}`,
    text: `Email received from contact from \n Sender name: ${name}\n Sender Email: ${email}\n Sender Message:${message}`,
    html: `
          <h4> Message received from  : </h4>
          <p> Sender name: ${name}</p>
          <p> Sender email: ${email}</p>
          <p>Sender message: ${message}</p>
          <hr/>
          <p> This email may contain sensitive information </p>
          <p>https://something.com.np</p>
      `,
  };
  sgMail.send(emailData).then((sent) => {
    return res.json({
      success: true,
    });
  });
};
