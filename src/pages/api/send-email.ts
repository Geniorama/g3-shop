// pages/api/send-email.ts
import sendgrid from '@sendgrid/mail';
import { NextApiRequest, NextApiResponse } from 'next';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY!);

const verifyCaptcha = async (token: string) => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify`;

  // Crear el cuerpo de la solicitud
  const params = new URLSearchParams();
  params.append('secret', secretKey!);
  params.append('response', token);

  // Enviar la solicitud de verificación a Google
  const response = await fetch(verifyUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(), // Enviar el cuerpo con los parámetros
  });

  const data = await response.json();
  return data.success;
};


export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, message, phone, captchaToken } = req.body;

    // Verificar reCAPTCHA
    const isCaptchaValid = await verifyCaptcha(captchaToken);
    if (!isCaptchaValid) {
      return res.status(400).json({ success: false, error: 'Verificación de reCAPTCHA fallida' });
    }

    try {
      // Enviar el correo si la verificación de reCAPTCHA es válida
      await sendgrid.send({
        to: 'info@g3print.com',
        from: {
          email: 'web@g3print.com',
          name: 'G3 Print Web',
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
      console.error('Error al enviar el correo:', error);
      return res.status(500).json({ success: false, error: 'Error al enviar el correo' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
