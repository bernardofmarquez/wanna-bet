import Joi from 'joi';
import { PostParticipantParams } from '../utils/protocols';

export const participantSchema = Joi.object<PostParticipantParams>({
  name: Joi.string().required(),
  balance: Joi.number().min(10).required(),
});