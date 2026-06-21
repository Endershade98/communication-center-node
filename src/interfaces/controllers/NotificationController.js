// src/interfaces/controllers/NotificationController.js

import SendNotificationDTO
from "../../application/dto/SendNotificationDTO.js";

import NotificationResponseDTO
from "../../application/dto/NotificationResponseDTO.js";

export default class NotificationController {

  constructor(
    createNotificationUseCase,
    getNotificationByIdUseCase,
    getNotificationStatusUseCase
  ) {

    this.createNotificationUseCase =
      createNotificationUseCase;

    this.getNotificationByIdUseCase =
      getNotificationByIdUseCase;

    this.getNotificationStatusUseCase =
      getNotificationStatusUseCase;
  }

  async create(
    req,
    res,
    next
  ) {

    try {

      const dto =
        SendNotificationDTO
          .fromHttp(req.body);

      const result =
        await this
          .createNotificationUseCase
          .execute(dto);

      return res
        .status(201)
        .json(
          NotificationResponseDTO
            .fromDomain(result)
        );

    } catch (err) {

      next(err);

    }

  }

  async getById(
    req,
    res,
    next
  ) {

    try {

      const result =
        await this
          .getNotificationByIdUseCase
          .execute(
            req.params.id
          );

      return res.json(
        NotificationResponseDTO
          .fromDomain(result)
      );

    } catch (err) {

      next(err);

    }

  }

  async getStatus(
    req,
    res,
    next
  ) {

    try {

      const status =
        await this
          .getNotificationStatusUseCase
          .execute(
            req.params.id
          );

      return res.json({
        status:
          status.value,
      });

    } catch (err) {

      next(err);

    }

  }

}