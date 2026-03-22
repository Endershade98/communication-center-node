import express from "express"; // ✅ QUESTA RIGA MANCA
import CreateNotificationUseCase from "./application/use-cases/CreateNotificationUseCase.js";

export default function createApp({ repo, publisher }) {
  const app = express();

  app.use(express.json());

  const useCase = new CreateNotificationUseCase(repo, publisher);

  app.post("/notifications", async (req, res) => {
    try {
      const result = await useCase.execute(req.body);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  return app;
}