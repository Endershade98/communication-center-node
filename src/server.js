// src/server.js

import express from "express";
import { createContainer } from "./bootstrap/container.js";
import createNotificationRoutes from "./interfaces/routes/notificationRoutes.js";

const app = express();
app.use(express.json());

// =========================
// COMPOSITION ROOT
// =========================
const container = createContainer();

// =========================
// ROUTES
// =========================
app.use("/notifications", createNotificationRoutes(container));

// =========================
// START
// =========================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});