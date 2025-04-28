
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, htmlContent) => {
  const msg = {
    to,
    from: process.env.ADMIN_EMAIL,
    subject,
    html: htmlContent,
  };

  try {
    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = { sendEmail };
