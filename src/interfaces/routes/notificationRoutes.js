// src/interfaces/routes/notificationRoutes.js

import express from "express";
import NotificationController from "../controllers/NotificationController.js";

export default function createNotificationRoutes(container) {

  const router = express.Router();

  // dependency injection per controller
  const controller = new NotificationController(
    container.createNotificationUseCase
  );

  router.post("/", controller.create.bind(controller));

  return router;
}