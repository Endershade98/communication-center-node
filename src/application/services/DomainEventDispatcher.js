// src/application/services/DomainEventDispatcher.js

export default class DomainEventDispatcher {
  constructor(eventPublisher) {
    this.eventPublisher = eventPublisher;
  }

  async dispatch(events = []) {
    for (const event of events) {
      const payload = event.toJSON();

      await this.eventPublisher.publish(
        payload.eventName,
        payload
      );
    }
  }
}