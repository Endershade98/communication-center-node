// src/application/services/DomainEventDispatcher.js

export default class DomainEventDispatcher {

  constructor(eventPublisher) {
    this.eventPublisher =
      eventPublisher;
  }

  async dispatch(events = []) {

    for (const event of events) {

      await this.eventPublisher.publish(
        event.stream,
        event.toJSON()
      );

    }

  }

}