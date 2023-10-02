import { Participant } from '@prisma/client'

export type ApplicationError = {
  name: string;
  message: string;
};

export type PostParticipantParams = Pick<Participant, 'name' | 'balance'>;