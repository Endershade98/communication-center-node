// src/application/dto/SendNotificationDTO.js

export default class SendNotificationDTO {
  constructor({ recipient, message, channel, priority }) {
    if (!recipient) throw new Error("recipient is required");
    if (!message) throw new Error("message is required");
    if (!channel) throw new Error("channel is required");
    if (!priority) throw new Error("priority is required");

    this.recipient = recipient;
    this.message = message;
    this.channel = channel;
    this.priority = priority;
  }

  static fromHttp(body) {
    return new SendNotificationDTO({
      recipient: body.recipient,
      message: body.message,
      channel: body.channel,
      priority: body.priority,
    });
  }
}