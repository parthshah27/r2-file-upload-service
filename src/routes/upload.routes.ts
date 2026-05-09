import { Router } from "express";
import multer from "multer";
import { uploadFile, getFile } from "../controllers/upload.controller";

const router = Router();
const upload = multer();

router.post("/upload", upload.single("file"), uploadFile);
router.get("/file/:key", getFile);

export default router;