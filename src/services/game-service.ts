import gameRepository from "../repositories/game-repository";

async function createGame(homeTeamName : string, awayTeamName: string) {
  const game = await gameRepository.create(homeTeamName, awayTeamName);

  return game;
}

const gameService = {
  createGame,
}

export default gameService;