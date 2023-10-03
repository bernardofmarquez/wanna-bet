import Joi from 'joi';
import { PostGameParams, UpdateGameParams } from '../utils/protocols';

export const gameSchema = Joi.object<PostGameParams>({
  homeTeamName: Joi.string().required(),
  awayTeamName: Joi.string().required(),
});

export const updateGameSchema = Joi.object<UpdateGameParams>({
  homeTeamScore: Joi.number().required(),
  awayTeamScore: Joi.number().required()
})