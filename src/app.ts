import express from "express";
import uploadRoutes from "./routes/upload.routes";

const app = express();

app.use(express.json());

app.use("/api", uploadRoutes);

app.get("/", (_, res) => {
  res.send("R2 File Upload Service Running 🚀");
});

export default app;