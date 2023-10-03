import { Router } from "express";
import { validateBody } from "../middlewares/validate-schema";
import { gameSchema } from "../schemas/game-schema";
import { postGame } from "../controllers/game-controller";

const gameRouter = Router();

gameRouter.
  post('/', validateBody(gameSchema), postGame);

export { gameRouter }