// src/interfaces/routes/notificationRoutes.js

import express from "express";

import NotificationController
from "../controllers/NotificationController.js";

import CreateNotificationUseCase
from "../../application/use-cases/CreateNotificationUseCase.js";

import GetNotificationByIdUseCase
from "../../application/use-cases/GetNotificationByIdUseCase.js";

import GetNotificationStatus
from "../../application/use-cases/GetNotificationStatus.js";

export default function createNotificationRoutes(
  repo,
  publisher
) {

  const router =
    express.Router();

  const createUseCase =
    new CreateNotificationUseCase(
      repo,
      publisher
    );

  const getByIdUseCase =
    new GetNotificationByIdUseCase(
      repo
    );

  const getStatusUseCase =
    new GetNotificationStatus(
      repo
    );

  const controller =
    new NotificationController(
      createUseCase,
      getByIdUseCase,
      getStatusUseCase
    );

  router.post(
    "/",
    controller.create.bind(
      controller
    )
  );

  router.get(
    "/:id",
    controller.getById.bind(
      controller
    )
  );

  router.get(
    "/:id/status",
    controller.getStatus.bind(
      controller
    )
  );

  return router;
}