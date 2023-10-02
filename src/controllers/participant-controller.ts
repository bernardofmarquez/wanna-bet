import { Request, Response } from "express";
import httpStatus from "http-status";
import participantService from "../services/parcipant-service";
import { PostParticipantParams } from "../utils/protocols";

export async function postParticipant(req: Request, res: Response) {
  const { name, balance} = req.body as PostParticipantParams;

  try {
    const result = participantService.createParticipant(name, balance);

    return res.status(httpStatus.OK).send(result);
  } catch (error : any) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}