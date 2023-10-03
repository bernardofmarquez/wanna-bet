import participantRepository from '../repositories/participant-repository';

async function createParticipant(name : string, balance: number) {
  const participant = await participantRepository.create(name, balance);

  return participant;
}

async function findAllParticipants() {
  const participants = await participantRepository.findAll();

  return participants;
}

const participantService = {
  createParticipant,
  findAllParticipants,
}

export default participantService;