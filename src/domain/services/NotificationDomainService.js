// src/domain/services/NotificationDomainService.js

export default class NotificationDomainService {

  process(notification) {
    return notification.markAsProcessing();
  }

  sent(notification) {
    return notification.markAsSent();
  }

  failed(notification, error) {
    return notification.markAsFailed(
      error,
    );
  }

  retry(notification) {
    return notification.retry();
  }

  dead(notification) {
    return notification.markAsDead();
  }

}