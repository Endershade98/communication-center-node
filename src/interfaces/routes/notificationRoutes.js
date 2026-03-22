// src/interfaces/routes/notificationRoutes.js
import express from "express";

export default function notificationRoutes(controller) {
  const router = express.Router();

  router.post("/", controller.create.bind(controller));

  return router;
}