import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, vehicleMake, vehicleModel, vehicleYear, serviceOrPart, comments } = req.body;

    // Create a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Prepare email content
    const mailOptions = {
      from: `"Highway Autosolutions" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: 'New Quote Request',
      text: `
        Name: ${name}
        Email: ${email}
        Vehicle Make: ${vehicleMake}
        Vehicle Model: ${vehicleModel}
        Vehicle Year: ${vehicleYear}
        Service/Part Needed: ${serviceOrPart}
        Additional Comments: ${comments}
      `,
      attachments: req.body.file ? [{
        filename: req.body.file.name,
        content: req.body.file.data,
        contentType: req.body.file.type,
      }] : [],
    };

    // Send email
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ success: false });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
