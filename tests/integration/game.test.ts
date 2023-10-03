import supertest from "supertest";
import app, { init } from "../../src/app";
import { cleanDb } from "../helpers";
import { createParticipant } from "../factories/participant-factory";
import { createGame } from "../factories/game-factory";
import { createBet } from "../factories/bet-factory";

const server = supertest(app);

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

describe('POST /games', () => {
  it('should respond with status 400 if body has invalid data', async () => {
    const result = await server.post('/games');

    const { statusCode, body } = result;
    expect(statusCode).toBe(400) 
    expect(body.message).toEqual('Invalid data')
  });

  it('should respond with status 201 when game is created', async () => {
    const result = await server.post('/games').send({homeTeamName: 'Vasco', awayTeamName: 'Cruzeiro'});

    const { statusCode, body } = result;
    expect(statusCode).toBe(201);
    expect(body).toMatchObject({
      homeTeamName: 'Vasco', 
      awayTeamName: 'Cruzeiro',
      homeTeamScore: 0,
      awayTeamScore: 0,
      isFinished: false,
    });
  });
})

describe('GET /games', () => {
  it('should respond with empty array when there is no games', async () => {
    const result = await server.get('/games');

    const { statusCode, body } = result;
    expect(statusCode).toBe(200);
    expect(body).toEqual([]);
  });

  it('should respond with all the games', async () => {
    await createGame('Vasco', 'Cruzeiro');
    await createGame('Atlético', 'Curitiba');

    const result = await server.get('/games');

    const { statusCode, body } = result;
    expect(statusCode).toBe(200);
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          homeTeamName: expect.any(String),
          awayTeamName: expect.any(String),
          homeTeamScore: expect.any(Number),
          awayTeamScore: expect.any(Number),
          isFinished: expect.any(Boolean),
        })
      ])
    );
  })
})

describe('GET /games:id', () => {
  it('should respond with status 404 if id is not found', async () => {
    const result = await server.get('/games/1')

    const { statusCode, body } = result;
    expect(statusCode).toBe(404) ;
    expect(body.message).toEqual('No result for this search!');
  });

  it('should respond with the designated game', async () => {
    const game = await createGame('Vasco', 'Cruzeiro');

    const result = await server.get(`/games/${game.id}`);

    const { statusCode, body } = result;
    expect(statusCode).toBe(200);
    expect(body).toMatchObject({
      homeTeamName: game.homeTeamName, 
      awayTeamName: game.awayTeamName,
      homeTeamScore: game.homeTeamScore,
      awayTeamScore: game.awayTeamScore,
      isFinished: game.isFinished,
    });
  })
})

describe('POST /bets/:id/finish', () => {
  it('should respond with the designated finished game', async () => {
    const game = await createGame('Vasco', 'Cruzeiro');
    const participant = await createParticipant('Bernardo', 10000);
    const bet = await createBet(2, 1, 20000, game.id, participant.id);

    const result = await server.post(`/games/${game.id}/finish`).send({
      homeTeamScore: 2,
      awayTeamScore: 1,
    });

    const { statusCode, body } = result;
    expect(statusCode).toBe(200);
    expect(body).toMatchObject({
      homeTeamName: game.homeTeamName, 
      awayTeamName: game.awayTeamName,
      homeTeamScore: 2,
      awayTeamScore: 1,
      isFinished: true,
    });
  })
})