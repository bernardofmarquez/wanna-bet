import { Request, Response } from "express";
import httpStatus from "http-status";
import { PostGameParams } from "../utils/protocols";
import gameService from "../services/game-service";

export async function postGame(req: Request, res: Response) {
  const { homeTeamName, awayTeamName } = req.body as PostGameParams;

  try {
    const result = await gameService.createGame(homeTeamName, awayTeamName);

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}