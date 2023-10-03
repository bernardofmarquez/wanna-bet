import { prisma } from "../../src/config/database";

export async function createParticipant(name : string, balance : number) {
  return prisma.participant.create({
    data: {
      name,
      balance,
    },
  });
}