import supertest from "supertest";
import app, { init } from "../../src/app";
import { cleanDb } from "../helpers";
import { createParticipant } from "../factories/participant-factory";
import { createGame } from "../factories/game-factory";

const server = supertest(app);

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

describe('POST /bets', () => {
  it('shoud respond with status 400 if body has invalid data', async () => {
    const result = await server.post('/bets');

    const { statusCode, body } = result;
    expect(statusCode).toBe(400) 
    expect(body.message).toEqual('Invalid data')
  });

  it('should respond with status 404 if gameId is not found', async () => {
    const result = await server.post('/bets').send({
      homeTeamScore: 2, 
      awayTeamScore : 0, 
      amountBet: 2000,
      gameId: 1,
      participantId: 1
    })

    const { statusCode, body } = result;
    expect(statusCode).toBe(404) ;
    expect(body.message).toEqual('No result for this search!');
  });

  it('should respond with status 404 if participantId is not found', async () => {
    const game = await createGame('Vasco', 'Cruzeiro');

    const result = await server.post('/bets').send({
      homeTeamScore: 2, 
      awayTeamScore : 0, 
      amountBet: 2000,
      gameId: game.id,
      participantId: 1,
    })

    const { statusCode, body } = result;
    expect(statusCode).toBe(404) ;
    expect(body.message).toEqual('No result for this search!');
  });

  it('should respond with status 400 if participant doesnt have enough money', async () => {
    const game = await createGame('Vasco', 'Cruzeiro');
    const participant = await createParticipant('Bernardo', 1000);

    const result = await server.post('/bets').send({
      homeTeamScore: 2, 
      awayTeamScore : 0, 
      amountBet: 2000,
      gameId: game.id,
      participantId: participant.id,
    });

    const { statusCode, body } = result;
    expect(statusCode).toBe(400);
    expect(body.message).toEqual('You dont have enough money for this bet!');
  });

  it('should respond with status 201 when bet is created', async () => {
    const game = await createGame('Vasco', 'Cruzeiro');
    const participant = await createParticipant('Bernardo', 2000);

    const result = await server.post('/bets').send({
      homeTeamScore: 2, 
      awayTeamScore : 0, 
      amountBet: 1000,
      gameId: game.id,
      participantId: participant.id,
    });

    const { statusCode, body } = result;
    expect(statusCode).toBe(201);
    expect(body).toMatchObject({
      homeTeamScore: 2, 
      awayTeamScore : 0, 
      amountBet: 1000,
      gameId: game.id,
      participantId: participant.id,
      status: 'PENDING',
      amountWon: 0,
    });
  })
});