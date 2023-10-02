import { prisma } from "../config/database";

async function createParticipant(name: string, balance: number) {
  return prisma.participant.create({
    data: {
      name,
      balance
    },
  });
};

const participantRepository = {
  createParticipant,
}

export default participantRepository;