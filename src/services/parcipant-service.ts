import { Participant } from '@prisma/client'
import participantRepository from '../repositories/participant-repository';

async function createParticipant(name : string, balance: number) {
  const participant = participantRepository.createParticipant(name, balance);

  return participant;
}

const participantService = {
  createParticipant,
}

export default participantService;