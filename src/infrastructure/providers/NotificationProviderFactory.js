// src/infrastructure/providers/NotificationProviderFactory.js

import FakeEmailProvider from "./email/FakeEmailProvider.js";

export default class NotificationProviderFactory {

  constructor() {

    this.providers = {
      EMAIL: new FakeEmailProvider(),
    };

  }

  get(channel) {

    const provider =
      this.providers[channel];

    if (!provider) {
      throw new Error(
        `Provider not found for ${channel}`
      );
    }

    return provider;
  }

}