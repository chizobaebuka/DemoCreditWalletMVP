# Demo Credit Wallet Service MVP

This project implements a wallet service MVP for Demo Credit, a mobile lending app. The service provides functionality for user account creation, wallet funding, fund transfers between users, and withdrawals.

## Features

- User account creation
- Wallet funding
- Fund transfers between users
- Withdrawals
- Blacklist check using Lendsqr Adjutor Karma API

## Tech Stack

- Node.js (LTS version)
- TypeScript
- Express.js
- KnexJS ORM
- MySQL database
- Jest for unit testing

## Project Structure

```
demo-credit-wallet-service/
├── src/
│   ├── config/
│   │   └── database.ts
│   ├── models/
│   │   ├── User.ts
│   │   └── Wallet.ts
│   ├── routes/
│   │   ├── userRoutes.ts
│   │   └── walletRoutes.ts
│   ├── services/
│   │   └── adjutorService.ts
│   ├── database/
│   │   └── migrations/
│   │       └── 20230515000000_create_users_and_wallets_tables.ts
│   └── index.ts
├── tests/
│   ├── models/
│   ├── routes/
│   └── services/
├── .env
├── .gitignore
├── knexfile.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Entity-Relationship (E-R) Diagram

```
+----------------+        +----------------+
|     Users      |        |    Wallets     |
+----------------+        +----------------+
| id (UUID) PK   |        | id (UUID) PK   |
| username       |        | userId (UUID) FK|
| email          |        | balance        |
| password       |        |                |
+----------------+        +----------------+
        |                         |
        |         1:1             |
        +-------------------------+
```

## Setup and Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up your MySQL database
4. Create a `.env` file with the following variables:
   ```
   DB_HOST=localhost
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=demo_credit
   PORT=3000
   ADJUTOR_API_KEY=your_adjutor_api_key
   ```
5. Run database migrations: `npm run migrate`
6. Start the server: `npm run dev`

## API Endpoints

- POST /api/users/register - Register a new user
- POST /api/wallet/fund - Fund user's wallet
- POST /api/wallet/transfer - Transfer funds between users
- POST /api/wallet/withdraw - Withdraw funds from user's wallet
- GET /api/wallet/balance - Get user's wallet balance

## Testing

Run unit tests: `npm test`

## Design Decisions and Best Practices

1. **TypeScript**: Used for type safety and better developer experience.
2. **Express.js**: Chosen for its simplicity and wide adoption in the Node.js ecosystem.
3. **KnexJS ORM**: Provides a flexible query builder and migration system for MySQL.
4. **UUID**: Used for generating unique identifiers for users and wallets.
5. **Environment Variables**: Sensitive information is stored in environment variables.
6. **Modular Structure**: The project is organized into models, routes, and services for better maintainability.
7. **Transaction Support**: Used in fund transfers to ensure data consistency.
8. **Error Handling**: Proper error handling and logging are implemented throughout the application.
9. **Middleware**: Custom middleware is used for user authentication and validation.
10. **Blacklist Check**: Integration with Lendsqr Adjutor Karma API to prevent onboarding of blacklisted users.

## Future Improvements

1. Implement proper authentication and authorization (e.g., JWT)
2. Add more comprehensive input validation and sanitization
3. Implement rate limiting to prevent abuse
4. Add more detailed logging and monitoring
5. Implement caching for frequently accessed data
6. Add pagination for list endpoints
7. Implement a more robust error handling and reporting system
8. Add integration tests and increase test coverage
9. Implement database indexing for better performance
10. Consider using a message queue for handling asynchronous tasks