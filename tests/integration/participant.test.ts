import supertest from "supertest";
import app, { init } from "../../src/app";
import { cleanDb } from "../helpers";
import { createParticipant } from "../factories/participant-factory";

const server = supertest(app);

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

describe('POST /participants', () => {
  it('should respond with status 400 if body has invalid data', async () => {
    const result = await server.post('/participants');

    const { statusCode, body } = result;
    expect(statusCode).toBe(400) 
    expect(body.message).toEqual('Invalid data')
  });
  
  it('should respond with status 400 when participant has less than R$10,00 in its balance', async () => {
    const result = await server.post('/participants').send({name: 'Bernardo', balance: 900});

    const { statusCode, body } = result;
    expect(statusCode).toBe(400) 
    expect(body.message).toEqual('Invalid data')
  });

  it('should respond with status 201 when participant is created', async () => {
    const result = await server.post('/participants').send({name: 'Bernardo', balance: 1000});

    const { statusCode, body } = result;
    expect(statusCode).toBe(201);
    expect(body).toMatchObject({
      name: 'Bernardo',
      balance: 1000,
    });
  })
});

describe('GET /participants', () => {
  it('should respond with empty array when there is no participants', async () => {
    const result = await server.get('/participants');

    const { statusCode, body } = result;
    expect(statusCode).toBe(200);
    expect(body).toEqual([]);
  });

  it('should respond with all the participants', async () => {
    await createParticipant('Bernardo', 20000);
    await createParticipant('Rafael', 10000);

    const result = await server.get('/participants');

    const { statusCode, body } = result;
    expect(statusCode).toBe(200);
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          balance: expect.any(Number),
        })
      ])
    );
  })
})