import { prisma } from "../config/database";

async function create(homeTeamName : string, awayTeamName: string) {
  return prisma.game.create({
    data: {
      homeTeamName,
      awayTeamName
    },
  });
};

async function findOne(id: number) {
  return prisma.game.findFirst({
    where: {
      id
    },
  });
};

const gameRepository = {
  create,
  findOne,
}

export default gameRepository;