// pages/api/send-email.js
import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message, phone } = req.body;

    try {
      await sendgrid.send({
        to: 'angel.burgos@geniorama.co',
        from: {
            email:'info@g3print.com',
            name: 'G3 Print Web'
        },
        subject: `G3 Print Web - New message from ${name}`,
        html: `
          <h1>New contact message</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      });

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: 'Error to send email' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
