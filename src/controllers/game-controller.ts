import { Request, Response } from "express";
import httpStatus from "http-status";
import { PostGameParams, UpdateGameParams } from "../utils/protocols";
import gameService from "../services/game-service";

export async function postGame(req: Request, res: Response) {
  const { homeTeamName, awayTeamName } = req.body as PostGameParams;

  try {
    const result = await gameService.createGame(homeTeamName, awayTeamName);

    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function finishGame(req: Request, res: Response) {
  const { homeTeamScore, awayTeamScore } = req.body as UpdateGameParams
  const id : number = Number(req.params.id);

  try {
    const result = await gameService.updateGame(id, homeTeamScore, awayTeamScore)

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error.name === 'NotFoundError') return res.status(httpStatus.NOT_FOUND).send(error);
    if (error.name === 'GameAlreadyFinishedError') return res.status(httpStatus.BAD_REQUEST).send(error);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}