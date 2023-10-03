import { Request, Response } from "express";
import httpStatus from "http-status";
import participantService from "../services/parcipant-service";
import { PostParticipantParams } from "../utils/protocols";

export async function postParticipant(req: Request, res: Response) {
  const { name, balance} = req.body as PostParticipantParams;

  try {
    const result = await participantService.createParticipant(name, balance);

    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    console.log(error)
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}