import { Status } from "@prisma/client";
import { prisma } from "../config/database";

async function create(homeTeamScore : number, awayTeamScore : number, 
  amountBet : number, gameId : number, participantId : number) {
  return prisma.bet.create({
    data: {
      homeTeamScore,
      awayTeamScore,
      amountBet,
      gameId,
      participantId,
      amountWon: 0
    }
  });
};

async function findByGameId(gameId: number) {
  return prisma.bet.findMany({
    where: {
      gameId,
    }
  });
};

async function update(id : number, status : Status, amountWon : number) {
  return prisma.bet.update({
    where: {
      id,
    },
    data: {
      status,
      amountWon,
    }
  });
}

const betRepository = {
  create,
  findByGameId,
  update
}

export default betRepository;