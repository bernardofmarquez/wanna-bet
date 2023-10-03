import { ApplicationError } from '../utils/protocols';

export function gameAlreadyFinishedError(): ApplicationError {
  return {
    name: 'GameAlreadyFinishedError',
    message: 'Game is already finished!',
  };
}