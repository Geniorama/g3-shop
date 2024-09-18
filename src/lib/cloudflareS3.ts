import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID,
  secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY,
  region: process.env.CLOUDFLARE_R2_REGION,
  endpoint: process.env.CLOUDFLARE_ENDPOINT,
  s3ForcePathStyle: true, // Esto es importante para que funcione con Cloudflare R2
});

export default s3;
