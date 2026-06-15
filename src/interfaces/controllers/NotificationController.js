// src/interfaces/controllers/NotificationController.js

export default class NotificationController {

  constructor(createNotificationUseCase) {
    this.createNotificationUseCase =
      createNotificationUseCase;
  }

  async create(req, res, next) {
    try {

      const {
        recipient,
        message,
        channel,
        priority,
      } = req.body;

      const result =
        await this.createNotificationUseCase.execute({
          recipient,
          message,
          channel,
          priority,
        });

      return res.status(201).json({
        id: result.id,
        status: result.status.value,
      });

    } catch (err) {
      next(err);
    }
  }
}