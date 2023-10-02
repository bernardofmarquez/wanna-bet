import { Router } from "express";
import { postParticipant } from "../controllers/participant-controller";
import { participantSchema } from "../schemas/participant-schema";
import { validateBody } from "../middlewares/validate-schema";

const participantRouter = Router();

participantRouter.
  post('/', validateBody(participantSchema), postParticipant);

export { participantRouter }