// src/interfaces/controllers/NotificationController.js

import SendNotificationDTO from "../../application/dto/SendNotificationDTO.js";
import NotificationResponseDTO from "../../application/dto/NotificationResponseDTO.js";

export default class NotificationController {
  constructor(createNotificationUseCase, getNotificationByIdUseCase) {
    this.createNotificationUseCase = createNotificationUseCase;
    this.getNotificationByIdUseCase = getNotificationByIdUseCase;
  }

  async create(req, res, next) {
    try {
      const dto = SendNotificationDTO.fromHttp(req.body);

      const result = await this.createNotificationUseCase.execute(dto);

      const response = NotificationResponseDTO.fromDomain(result);

      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;

      const result = await this.getNotificationByIdUseCase.execute(id);

      const response = NotificationResponseDTO.fromDomain(result);

      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
}