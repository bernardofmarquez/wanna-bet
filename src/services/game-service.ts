import { Bet } from "@prisma/client";
import { gameAlreadyFinishedError } from "../errors/game-finished-error";
import { notFoundError } from "../errors/not-found-error";
import betRepository from "../repositories/bet-repository";
import gameRepository from "../repositories/game-repository";
import betService from "./bet-service";

async function createGame(homeTeamName : string, awayTeamName: string) {
  const game = await gameRepository.create(homeTeamName, awayTeamName);

  return game;
}

async function updateGame(id : number, homeTeamScore : number, awayTeamScore : number) {
  const gameBet = await gameRepository.findOne(id);
  if (!gameBet) throw notFoundError();
  if (gameBet.isFinished) throw gameAlreadyFinishedError()

  const bets = await betRepository.findByGameId(id) as Bet[];
  let allMoneyBet = 0;
  let allMoneyWon = 0;
  bets.map(bet => {
    allMoneyBet += bet.amountBet
    if (bet.homeTeamScore === homeTeamScore && bet.awayTeamScore === awayTeamScore) {
      allMoneyWon += bet.amountBet
    }
  });

  bets.map(bet => {
    betService.updateBet(bet, homeTeamScore, awayTeamScore, allMoneyBet, allMoneyWon)
  });

  const gameUpdated = await gameRepository.update(id, homeTeamScore, awayTeamScore);

  return gameUpdated;
}

const gameService = {
  createGame,
  updateGame
}

export default gameService;