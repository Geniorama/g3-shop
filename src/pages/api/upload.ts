import type { NextApiRequest, NextApiResponse } from 'next';
// import formidable, { File as FormidableFile } from 'formidable';
import * as formidable from 'formidable';
import type { File as FormidableFile} from 'formidable';
import { r2Client } from '@/lib/r2';
import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Readable } from 'stream';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

const parseFormData = (req: NextApiRequest) => {
  return new Promise<{ file: Buffer; filename: string; contentType: string }>((resolve, reject) => {
    const form = new formidable.IncomingForm();

    form.parse(req, (err: Error | null, fields: formidable.Fields, files: formidable.Files) => {
      if (err) {
        console.error('Error parsing form data:', err);
        reject(err);
        return;
      }

      const file = files.file ? (Array.isArray(files.file) ? files.file[0] as FormidableFile : files.file as FormidableFile) : undefined;

      if (!file) {
        console.error('No file uploaded');
        reject(new Error('No file uploaded'));
        return;
      }

      const filename = file.originalFilename!;
      const contentType = file.mimetype!;

      fs.readFile(file.filepath, (err: NodeJS.ErrnoException | null, data: Buffer) => {
        if (err) {
          console.error('Error reading file:', err);
          reject(err);
          return;
        }

        console.log('File read successfully:', filename);
        resolve({
          file: data,
          filename,
          contentType,
        });
      });
    });
  });
};


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { file, filename, contentType } = await parseFormData(req);

      const uploadCommand = new PutObjectCommand({
        Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME!,
        Key: filename,
        Body: file, // Convierte el buffer a readable stream
        ContentType: contentType,
        ACL: 'public-read', // Opcional
      });

      await r2Client.send(uploadCommand);

      const getCommand = new GetObjectCommand({
        Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME!,
        Key: filename,
      });

      const signedUrl = await getSignedUrl(r2Client, getCommand, { expiresIn: 3600 });

      res.status(200).json({
        message: 'Archivo cargado exitosamente',
        url: signedUrl,
      });
    } catch (error) {
      console.error('Error al cargar el archivo:', error);
      res.status(500).json({ error: 'Error al cargar el archivo' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
