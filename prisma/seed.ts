import { prisma, connectDb } from "../src/config/database";

async function seed() {
  connectDb();

  await prisma.participant.createMany({
    data: [
      { name: "Bernardo", balance: 20000 },
      { name: "Rafael", balance: 5000 },
      { name: "Gustavo", balance: 10000 },
    ],
  });

  await prisma.game.createMany({
    data: [
      {
        homeTeamName: "Flamengo",
        awayTeamName: "Santos",
      },
      {
        homeTeamName: "Corinthias",
        awayTeamName: "Cruzeiro",
      },
      {
        homeTeamName: "Vasco",
        awayTeamName: "Coritiba",
      },
      {
        homeTeamName: "Atlético",
        awayTeamName: "Fortaleza",
      },
    ],
  });

  await prisma.bet.createMany({
    data: [
      {
        homeTeamScore: 2,
        awayTeamScore: 1,
        amountBet: 100,
        gameId: 1,
        participantId: 1,
        status: "PENDING",
        amountWon: 0
      },
      {
        homeTeamScore: 2,
        awayTeamScore: 1,
        amountBet: 200,
        gameId: 1,
        participantId: 2,
        status: "PENDING",
        amountWon: 0
      },
      {
        homeTeamScore: 1,
        awayTeamScore: 4,
        amountBet: 500,
        gameId: 2,
        participantId: 3,
        status: "PENDING",
        amountWon: 0
      },
      {
        homeTeamScore: 1,
        awayTeamScore: 4,
        amountBet: 100,
        gameId: 2,
        participantId: 1,
        status: "PENDING",
        amountWon: 0
      },
      {
        homeTeamScore: 2,
        awayTeamScore: 0,
        amountBet: 300,
        gameId: 3,
        participantId: 2,
        status: "PENDING",
        amountWon: 0
      },
      {
        homeTeamScore: 1,
        awayTeamScore: 0,
        amountBet: 250,
        gameId: 2,
        participantId: 3,
        status: "PENDING",
        amountWon: 0
      },
      {
        homeTeamScore: 1,
        awayTeamScore: 2,
        amountBet: 300,
        gameId: 3,
        participantId: 2,
        status: "PENDING",
        amountWon: 0
      },
      {
        homeTeamScore: 2,
        awayTeamScore: 5,
        amountBet: 400,
        gameId: 4,
        participantId: 3,
        status: "PENDING",
        amountWon: 0
      },
      {
        homeTeamScore: 1,
        awayTeamScore: 1,
        amountBet: 500,
        gameId: 4,
        participantId: 1,
        status: "PENDING",
        amountWon: 0
      },
      {
        homeTeamScore: 7,
        awayTeamScore: 3,
        amountBet: 400,
        gameId: 4,
        participantId: 1,
        status: "PENDING",
        amountWon: 0
      },
      {
        homeTeamScore: 1,
        awayTeamScore: 1,
        amountBet: 500,
        gameId: 4,
        participantId: 3,
        status: "PENDING",
        amountWon: 0
      },
    ],
  });
}
seed();