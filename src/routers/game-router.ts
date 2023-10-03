import { Router } from "express";
import { validateBody } from "../middlewares/validate-schema";
import { gameSchema, updateGameSchema } from "../schemas/game-schema";
import { finishGame, getGameAndBetsById, getGames, postGame } from "../controllers/game-controller";

const gameRouter = Router();

gameRouter.
  post('/', validateBody(gameSchema), postGame).
  post('/:id/finish', validateBody(updateGameSchema), finishGame).
  get('/', getGames).
  get('/:id', getGameAndBetsById);

export { gameRouter }