import { Bet, Game, Participant } from '@prisma/client'

export type ApplicationError = {
  name: string;
  message: string;
};

export type PostParticipantParams = Pick<Participant, 'name' | 'balance'>;

export type PostGameParams = Pick<Game, 'homeTeamName' | 'awayTeamName'>;

export type PostBetParams = Pick<Bet, 'homeTeamScore' | 'awayTeamScore' | 
  'amountBet' | 'gameId' |'participantId'>

export type UpdateGameParams = Pick<Game, 'homeTeamScore' | 'awayTeamScore'>;