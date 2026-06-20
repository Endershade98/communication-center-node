// src/infrastructure/providers/email/FakeEmailProvider.js

export default class FakeEmailProvider {

  async send(notification) {

    return {
      success: true
    };

  }

}