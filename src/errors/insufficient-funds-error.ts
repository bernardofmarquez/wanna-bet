import { ApplicationError } from '../utils/protocols';

export function insufficientFundsError(): ApplicationError {
  return {
    name: 'InsufficientFundsError',
    message: 'You dont have enough money for this bet!',
  };
}