// src/domain/repositories/NotificationRepository.js

export default class NotificationRepository {

  /**
   * Salva una nuova notifica
   * @param {Notification} notification
   */
  async save(notification) {
    throw new Error("save() not implemented");
  }

  /**
   * Aggiorna una notifica esistente
   * @param {Notification} notification
   */
  async update(notification) {
    throw new Error("update() not implemented");
  }

  /**
   * Trova una notifica per ID
   * @param {string} id
   * @returns {Notification|null}
   */
  async findById(id) {
    throw new Error("findById() not implemented");
  }

  /**
   * Lista notifiche per destinatario
   * @param {string} recipient
   * @returns {Notification[]}
   */
  async findByRecipient(recipient) {
    throw new Error("findByRecipient() not implemented");
  }

}