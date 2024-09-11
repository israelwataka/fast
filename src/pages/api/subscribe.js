import nodemailer from 'nodemailer';

const subscribeHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { email } = req.body;

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const message = {
      from: `"Highway Autosolutions" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: 'New Newsletter Subscription',
      text: `A new user has registered for our newsletter: ${email}`,
    };

    try {
      await transporter.sendMail(message);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ success: false, error: 'Error sending email' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
};

export default subscribeHandler;
