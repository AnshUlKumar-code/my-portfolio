// // utils/email.js
// import nodemailer from 'nodemailer'

// const transporter = nodemailer.createTransport({
  
//    host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// })

// export const sendContactEmail = async ({ name, email, subject, message }) => {

//     console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS);
    
//   await transporter.sendMail({
//     from: process.env.EMAIL_USER,
//     to: process.env.ADMIN_EMAIL,
//     replyTo: email,
//     subject: subject,
//     html: `
//       <h2>New Contact Message</h2>
//       <p><strong>Name:</strong> ${name}</p>
//       <p><strong>Email:</strong> ${email}</p>
//       <p><strong>Message:</strong></p>
//       <p>${message}</p>
//     `
//   })
// }

// utils/email.js
import { Resend } from "resend";
RESEND_API_KEY="re_N8PotEfL_AFsQb7VycGXvuW1EG2nMHwpG"
const resend = new Resend(RESEND_API_KEY);


export const sendContactEmail = async ({ name, email, subject, message }) => {
  try {
    console.log("Using Resend API Key:", RESEND_API_KEY);

    await resend.emails.send({
      from: "onboarding@resend.dev", // works for testing
      to: process.env.ADMIN_EMAIL,
      reply_to: email,
      subject: subject,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

  } catch (error) {
    console.error("Resend error:", error);
    throw error;
  }
};