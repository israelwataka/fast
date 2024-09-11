import nodemailer from 'nodemailer';

const phoneHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { phone } = req.body;

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'New Call Request',
      text: `Phone Number: ${phone}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Request sent successfully!' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send request' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default phoneHandler;
