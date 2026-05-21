import nodemailer from 'nodemailer';

//Create a transporter object using the SMTP settings
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",     //address of email server
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Function to send email
const  sendEmail = async ({to, subject, body}) => {
   // Send email using configured transporter
  const response = await transporte.sendMail({
    from: process.env.SENDER_EMAIL,
    to,
    subject,
    html: body,
  })
  return response
}

export default sendEmail;