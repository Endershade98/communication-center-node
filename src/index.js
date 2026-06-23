// src/index.js

import { createServer } from "./server.js";

const PORT = process.env.PORT || 3000;


const { app } =
  createServer();


app.listen(
  PORT,
  () => {
    console.log(
      `Notification service running on port ${PORT}`
    );
  }
);