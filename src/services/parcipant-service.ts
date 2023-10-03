import participantRepository from '../repositories/participant-repository';

async function createParticipant(name : string, balance: number) {
  const participant = await participantRepository.create(name, balance);

  return participant;
}

const participantService = {
  createParticipant,
}

export default participantService;