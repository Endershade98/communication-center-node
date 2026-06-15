// src/interfaces/routes/notificationRoutes.js

import express from "express";
import NotificationController from "../controllers/NotificationController.js";
import CreateNotificationUseCase from "../../application/use-cases/CreateNotificationUseCase.js";

export default function createNotificationRoutes(repo, publisher) {
  const router = express.Router();

  const useCase = new CreateNotificationUseCase(repo, publisher);
  const controller = new NotificationController(useCase);

  router.post("/", controller.create.bind(controller));

  return router;
}