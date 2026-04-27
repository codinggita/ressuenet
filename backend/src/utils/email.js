const nodemailer = require('nodemailer');

function createTransport() {
  if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  if (process.env.BREVO_EMAIL && process.env.BREVO_API_KEY) {
    return nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.BREVO_EMAIL,
        pass: process.env.BREVO_API_KEY,
      },
    });
  }

  return null;
}

async function sendEmail({ to, subject, text, html }) {
  const transporter = createTransport();

  if (!transporter) {
    return { queued: false, reason: 'Email transporter not configured.' };
  }

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.BREVO_EMAIL || process.env.EMAIL_USER,
    to,
    subject,
    text,
    html,
  });

  return { queued: true };
}

module.exports = { sendEmail };
