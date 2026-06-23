// src/interfaces/controllers/NotificationController.js

import SendNotificationDTO
from "../../application/dto/SendNotificationDTO.js";

import NotificationResponseDTO
from "../../application/dto/NotificationResponseDTO.js";

export default class NotificationController {

  constructor(
    createNotificationUseCase,
    getNotificationByIdUseCase,
    getNotificationStatusUseCase,
  ) {

    this.createNotificationUseCase =
      createNotificationUseCase;

    this.getNotificationByIdUseCase =
      getNotificationByIdUseCase;

    this.getNotificationStatusUseCase =
      getNotificationStatusUseCase;

  }

  async create(req, res, next) {

    try {

      const dto =
        SendNotificationDTO.fromHttp(
          req.body,
        );

      const notification =
        await this.createNotificationUseCase.execute(
          dto,
        );

      return res.status(201).json(
        NotificationResponseDTO.fromDomain(
          notification,
        ),
      );

    } catch (err) {

      next(err);

    }

  }

  async getById(req, res, next) {

    try {

      const notification =
        await this.getNotificationByIdUseCase.execute(
          req.params.id,
        );

      return res.status(200).json(
        NotificationResponseDTO.fromDomain(
          notification,
        ),
      );

    } catch (err) {

      next(err);

    }

  }

  async getStatus(req, res, next) {

    try {

      const status =
        await this.getNotificationStatusUseCase.execute(
          req.params.id,
        );

      return res.status(200).json({
        status: status.value,
      });

    } catch (err) {

      next(err);

    }

  }

}