const nodemailer = require("nodemailer");
require("dotenv").config();

class EmailService {
  static async sendEmail({ name, email, message }) {
    // Configure the Nodemailer transport for Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",  // Use Gmail's SMTP
      auth: {
        user: process.env.GMAIL_USER,        // Your Gmail address
        pass: process.env.GMAIL_PASS,        // Your Gmail App password or OAuth token
      },
    });

    // Send the email
    await transporter.sendMail({
      to: process.env.TO_ADDRESS,     // The recipient address
      from: process.env.GMAIL_USER,   // Your Gmail address (same as sender)
      subject: "New message from portfolio", // Subject line
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <br>
        <p><strong>Message:</strong> ${message}</p>`,
    });
  }
}

module.exports = { EmailService };
