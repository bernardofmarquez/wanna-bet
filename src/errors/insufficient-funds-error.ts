import { ApplicationError } from '../utils/protocols';

export function insufficientFundsError(): ApplicationError {
  return {
    name: 'InsufficientFundsError',
    message: 'No result for this search!',
  };
}