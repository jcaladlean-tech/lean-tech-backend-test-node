import nodemailer from 'nodemailer';
import { config } from '../config';

export async function SendEmail(email: string, url: string) {
  try {
    const transporter = await nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.sendEmail.email,
        pass: config.sendEmail.password,
      },
    });

    const mailOptions = {
      from: config.sendEmail.email,
      to: email,
      subject: 'Link of data exported',
      text: `view or download your data in the follow link:\n ${url}`,
    };
    await transporter.sendMail(mailOptions);
  } catch (e) {
    throw e;
  }
}
