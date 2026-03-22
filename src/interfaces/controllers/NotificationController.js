export default class NotificationController {
  constructor(createNotificationUseCase) {
    this.createNotificationUseCase = createNotificationUseCase;
  }

  async create(req, res, next) {
    try {
      const { message, channel, priority } = req.body;

      const result = await this.createNotificationUseCase.execute({
        message,
        channel,
        priority,
      });

      return res.status(201).json({
        id: result.id,
        status: result.status,
      });
    } catch (err) {
      next(err);
    }
  }
}