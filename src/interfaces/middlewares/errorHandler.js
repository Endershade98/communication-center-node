// src/interfaces/middlewares/errorHandler.js

export default function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.message === "Notification not found") {
    return res.status(404).json({
      error: "NOT_FOUND",
      message: err.message,
    });
  }

  if (err.message === "id is required") {
    return res.status(400).json({
      error: "BAD_REQUEST",
      message: err.message,
    });
  }

  return res.status(500).json({
    error: "INTERNAL_SERVER_ERROR",
    message: "Unexpected error",
  });
}