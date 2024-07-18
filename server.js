const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 4000; // Changed port number

app.use(cors());
app.use(bodyParser.json());

app.post("/api/send-reset-email", (req, res) => {
  const { email } = req.body;

  // Create a transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "esvanth7@gmail.com", // Replace with your email
      pass: "Essuronaldo7#"  // Replace with your password
    },
  });

  const mailOptions = {
    from: "no-reply@yourwebsite.com",
    to: email,
    subject: "Password Reset",
    text: `Click the link below to reset your password:\n\nhttp://yourwebsite.com/reset_password?email=${encodeURIComponent(email)}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: "Failed to send email." });
    }
    res.status(200).json({ message: "Password reset link has been sent to your email." });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
