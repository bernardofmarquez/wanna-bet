import { Router } from "express";
import { validateBody } from "../middlewares/validate-schema";
import { postBet } from "../controllers/bet-controller";
import { betSchema } from "../schemas/bet-schema";

const betRouter = Router();

betRouter.
  post('/', validateBody(betSchema), postBet);

export { betRouter }