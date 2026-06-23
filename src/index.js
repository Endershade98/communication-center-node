// src/index.js

import { createServer } from "./server.js";
import { createContainer } from "./bootstrap/container.js";

const PORT =
  process.env.PORT || 3000;

const container =
  createContainer();

const { app } =
  createServer({
    repo: container.notificationRepository,
    publisher: container.eventPublisher,
  });

app.listen(
  PORT,
  () => {
    console.log(
      `Notification service running on port ${PORT}`
    );
  }
);