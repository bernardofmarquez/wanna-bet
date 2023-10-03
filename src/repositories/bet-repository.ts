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

const betRepository = {
  create,
}

export default betRepository;