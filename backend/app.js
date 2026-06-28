import express from "express";
import cors from "cors";

import documentRoutes from "./src/routes/document.routes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/uploads", express.static("src/uploads"));

app.use("/api/documents", documentRoutes);

export default app;
