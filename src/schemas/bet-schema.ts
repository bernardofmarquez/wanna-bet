import Joi from 'joi';
import { PostBetParams } from '../utils/protocols';

export const betSchema = Joi.object<PostBetParams>({
  homeTeamScore: Joi.number().required(), 
  awayTeamScore : Joi.number().required(), 
  amountBet: Joi.number().required(),
  gameId: Joi.number().required(),
  participantId: Joi.number().required()
});