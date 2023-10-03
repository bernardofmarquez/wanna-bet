import { Bet } from "@prisma/client";
import { gameAlreadyFinishedError } from "../errors/game-finished-error";
import { insufficientFundsError } from "../errors/insufficient-funds-error";
import { notFoundError } from "../errors/not-found-error";
import betRepository from "../repositories/bet-repository";
import gameRepository from "../repositories/game-repository";
import participantRepository from "../repositories/participant-repository";

async function createBet(homeTeamScore : number, awayTeamScore : number, 
  amountBet : number, gameId : number, participantId : number) {
  const gameBet = await gameRepository.findOne(gameId);
  if (!gameBet) throw notFoundError();
  if (gameBet.isFinished) throw gameAlreadyFinishedError()

  const participantBet = await participantRepository.findOne(participantId);
  if (!participantBet) throw notFoundError();

  if (participantBet.balance < amountBet) throw insufficientFundsError();

  const balanceNow = (participantBet.balance-amountBet);

  await participantRepository.updateBalance(participantId, balanceNow);
  
  const bet = await betRepository.create(homeTeamScore, awayTeamScore, 
    amountBet, gameId, participantId);

  return bet;
}

async function updateBet(bet : Bet, homeTeamScore : number, 
  awayTeamScore : number, allMoneyBet : number, allMoneyWon : number) {
  if (bet.homeTeamScore === homeTeamScore && bet.awayTeamScore === awayTeamScore) {
    const amountWon = Number(((bet.amountBet/allMoneyWon)*(allMoneyBet)*0.7).toFixed(2))
    await betRepository.update(bet.id, 'WON', amountWon)

    const participantBet = await participantRepository.findOne(bet.participantId);
    const balanceNow = (participantBet.balance+amountWon);

    await participantRepository.updateBalance(bet.participantId, balanceNow);
  } else {
    await betRepository.update(bet.id, 'LOST', 0)
  }
}

const betService = {
  createBet,
  updateBet
}

export default betService;