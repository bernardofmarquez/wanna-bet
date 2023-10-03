# Wanna Bet Backend
This project involves developing the backend for a sports betting platform. The platform will offer users the ability to place bets on upcoming sports events, including matches like a football game between Flamengo and Botafogo. Users can make predictions and, if correct, receive winnings after the event concludes.

## Endpoints
<details>
  <summary>Health Check</summary>
  <ul>
  <li>Health response</li>
  <details>
    <summary>(GET "/health")</summary>
  
  ```javascript
// response
  "OK!"
  ```
  </details>
</ul>
</details>
<br/>

<details>
  <summary>Participants endpoints</summary>
<br/>
  <ul>
    <li>Creates new participant</li>
<details>
  <summary>
  (POST "participants")
  </summary>
  <ul>
    <li>
      Should not have balance below R$10,00
    </li>
  </ul>
    
  ```javascript
  // body
{
	"name": "exampleName",
	"balance": 1000,
}
  ```
</details>
</ul>
</details>
<br/>

<details>
  <summary>Games endpoints</summary>
<br/>
  <ul>
    <li>Creates new game</li>
<details>
  <summary>
  (POST "posts")
  </summary>
    
  ```javascript
  // body
{
  "homeTeamName": "Vasco",
  "awayTeamName": "Cruzeiro",
}
  ```
</details>
</ul>
</details>
<br/>

## Technologies
The following tools and frameworks were used in the construction of the project:
<p>
  <img style='margin: 5px;' src='https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white'/>
  <img style='margin: 5px;' src='https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white'/>
  <img style='margin: 5px;' src='https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white'/>
  <img style='margin: 5px;' src='https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white'/>
  <img style='margin: 5px;' src='https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white'/>
  <img style='margin: 5px;' src='https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white'/>
</p>

## How to use
1. Clone this repository
2. Install dependencies
```bash
$ npm i
```

3. Configure the .env file using the .env.example file (see "Running application locally or inside docker" section for details)

4. Create your database with prisma
```bash
$ npx prisma migrate dev
$ npx prisma generate
```

5. Run the app
```bash
# development
$ npm run dev
```

## Running tests
1. Configure the .env.test file using the .env.example file

3. Run tests
```bash
# run tests
$ npm run test

# run coverage tests
$ npm run test:coverage
```
