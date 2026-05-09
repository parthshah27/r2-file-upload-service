import { Request, Response } from "express";
import { uploadToR2, getFileUrl } from "../services/upload.service";

export const uploadFile = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const key = await uploadToR2(req.file);

    res.json({
      message: "File uploaded successfully",
      key,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload failed" });
  }
};

export const getFile = async (req: Request, res: Response) => {
  try {
    const { key } = req.params;

    const url = await getFileUrl(key);

    res.json({ url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to generate URL" });
  }
};