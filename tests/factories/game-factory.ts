import { prisma } from "../../src/config/database";

export async function createGame(homeTeamName : string, awayTeamName : string) {
  return prisma.game.create({
    data: {
      homeTeamName,
      awayTeamName
    },
  });
}