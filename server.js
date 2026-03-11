const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

/* Middleware */

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Serve website files */

app.use(express.static("public"));

/* Contact Form */

app.post("/contact", (req, res) => {

const { name, email, message } = req.body;

console.log("Contact form hit");
console.log(name, email, message);

const transporter = nodemailer.createTransport({
service: "gmail",
auth: {
user: "mr.anurag6389@gmail.com",
pass: "yroqqogqoommnhkw"
}
});

const mailOptions = {
from: "mr.anurag6389@gmail.com",
to: "mr.anurag6389@gmail.com",
subject: `New Contact Message from ${name}`,
text: `Name: ${name}
Email: ${email}

Message:
${message}`
};

transporter.sendMail(mailOptions, (error, info) => {

if (error) {
console.log(error);
return res.status(500).send("Error sending email");
}

console.log("Email sent:", info.response);

/* Auto reply email */

const autoReply = {
from: "mr.anurag6389@gmail.com",
to: email,
subject: "Thanks for contacting Anurag",
text: `Hello ${name},

Thank you for contacting me.
I have received your message and will reply soon.

Regards,
Anurag Web Developer`
};

transporter.sendMail(autoReply);

res.send("Message sent successfully!");

});

});

/* Start Server */

app.listen(3000, () => {
console.log("Server running on port 3000");
});