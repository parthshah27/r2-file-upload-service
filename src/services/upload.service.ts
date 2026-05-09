import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2Client } from "../config/r2Client";
import { generateKey } from "../utils/generateKey";

export const uploadToR2 = async (file: Express.Multer.File) => {
  const key = generateKey(file.originalname);

  await r2Client.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET!,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    })
  );

  return key;
};

export const getFileUrl = async (key: string) => {
  const command = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET!,
    Key: key,
  });

  return await getSignedUrl(r2Client, command, { expiresIn: 3600 });
};