import supertest from "supertest";
import app from "../../src/app";

const server = supertest(app);

describe('health', () => {
  it('/health', async () => {
    const result = await server.get('/health');

    const { statusCode, body } = result;
    expect(statusCode).toBe(200) 
    expect(body.message).toEqual('OK!')
  })
})