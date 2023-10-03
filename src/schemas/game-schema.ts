import Joi from 'joi';
import { PostGameParams } from '../utils/protocols';

export const gameSchema = Joi.object<PostGameParams>({
  homeTeamName: Joi.string().required(),
  awayTeamName: Joi.string().required(),
});