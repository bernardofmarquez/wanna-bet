import { prisma } from "../../src/config/database";

export async function createBet(homeTeamScore : number, awayTeamScore : number, 
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