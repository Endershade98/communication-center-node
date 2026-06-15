// src/interfaces/routes/notificationRoutes.js

import express from "express";
import NotificationController from "../controllers/NotificationController.js";
import CreateNotificationUseCase from "../../application/use-cases/CreateNotificationUseCase.js";
import GetNotificationByIdUseCase from "../../application/use-cases/GetNotificationByIdUseCase.js";

export default function createNotificationRoutes(repo, publisher) {
  const router = express.Router();

  const createUseCase = new CreateNotificationUseCase(repo, publisher);
  const getByIdUseCase = new GetNotificationByIdUseCase(repo);

  const controller = new NotificationController(
    createUseCase,
    getByIdUseCase
  );

  router.post("/", controller.create.bind(controller));
  router.get("/:id", controller.getById.bind(controller));

  return router;
}