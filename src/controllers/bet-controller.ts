import { Request, Response } from "express";
import httpStatus from "http-status";
import { PostBetParams } from "../utils/protocols";
import betService from "../services/bet-service";

export async function postBet(req: Request, res: Response) {
  const { homeTeamScore, awayTeamScore, 
    amountBet, gameId, participantId } = req.body as PostBetParams;

  try {
    const result = await betService.createBet(homeTeamScore, awayTeamScore, 
      amountBet, gameId, participantId);

    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    if (error.name === 'NotFoundError') return res.status(httpStatus.NOT_FOUND).send(error);
    if (error.name === 'InsufficientFundsError' || 
    'GameAlreadyFinishedError') return res.status(httpStatus.BAD_REQUEST).send(error);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}