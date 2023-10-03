import express, {Express} from 'express';
import cors from 'cors'

import { connectDb, disconnectDB } from './config/database'
import { participantRouter } from './routers/participant-router';
import { gameRouter } from './routers/game-router';
import { betRouter } from './routers/bet-router';
import httpStatus from 'http-status';

const app = express();

app
  .use(cors())
  .use(express.json())
  .get('/health', (_req, res) => res.status(httpStatus.OK).send({ message: 'OK!' }))
  .use('/participants', participantRouter)
  .use('/games', gameRouter)
  .use('/bets', betRouter)

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}
  
export async function close(): Promise<void> {
  await disconnectDB();
}
  
export default app;