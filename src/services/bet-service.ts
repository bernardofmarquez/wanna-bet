import { insufficientFundsError } from "../errors/insufficient-funds-error";
import { notFoundError } from "../errors/not-found-error";
import betRepository from "../repositories/bet-repository";
import gameRepository from "../repositories/game-repository";
import participantRepository from "../repositories/participant-repository";

async function createBet(homeTeamScore : number, awayTeamScore : number, 
  amountBet : number, gameId : number, participantId : number) {
  
  const gameBet = await gameRepository.findOne(gameId);
  if (!gameBet) throw notFoundError();

  const participantBet = await participantRepository.findOne(participantId);
  if (!participantBet) throw notFoundError();

  if (participantBet.balance < amountBet) throw insufficientFundsError();

  const balanceNow = (participantBet.balance-amountBet);

  await participantRepository.updateBalance(participantId, balanceNow);
  
  const bet = await betRepository.create(homeTeamScore, awayTeamScore, 
    amountBet, gameId, participantId);

  return bet;
}

const betService = {
  createBet,
}

export default betService;