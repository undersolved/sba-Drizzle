# sba-Drizzle

This project is a small Express + Drizzle ORM API backed by PostgreSQL. It focuses on user signup, login, and basic profile access using a session-based authentication flow.

## What I Used To Create What

- `Express` was used to create the HTTP server and route handling in `index.js` and `routes/user.routes.js`.
- `Drizzle ORM` was used to create the database connection layer in `db/index.js` and the table definitions in `db/schema.js`.
- `PostgreSQL` was used to store users and sessions.
- `docker-compose.yml` was used to create a local PostgreSQL container for development.
- `dotenv` was used to load environment variables such as the database connection string and server port.
- `node:crypto` was used to create password hashes and session-related values.
- `pg` was used as the PostgreSQL driver under Drizzle.

## How The App Works

1. `index.js` starts the Express server and enables JSON request parsing.
2. A middleware checks the incoming `session-id` header.
3. If the session is valid, the middleware loads the authenticated user from the database and attaches it to `req.user`.
4. The `/user` router handles signup, login, profile fetch, and profile update actions.
5. The database schema defines two tables:
   - `users` for user account data
   - `user_sessions` for login sessions

## Project Structure

- `index.js` - server bootstrap and authentication middleware
- `db/index.js` - Drizzle database client setup
- `db/schema.js` - PostgreSQL table schema
- `routes/user.routes.js` - user authentication and profile routes
- `drizzle.config.js` - Drizzle Kit configuration
- `docker-compose.yml` - local PostgreSQL service

## API Flow

### Signup

`POST /user/signup`

- Accepts `name`, `email`, and `password`
- Checks whether the email already exists
- Creates a salt and hashes the password
- Inserts the new user into the `users` table

### Login

`POST /user/login`

- Accepts `email` and `password`
- Loads the matching user record
- Rebuilds the password hash using the stored salt
- Creates a new row in `user_sessions`
- Returns the generated `sessionId`

### Get Current User

`GET /user`

- Reads the authenticated user from `req.user`
- Returns `401` when no valid session is present

### Update Profile

`PATCH /user`

- Accepts a new `name`
- Updates the current user record

## Database Schema

### `users`

- `id` - UUID primary key
- `name` - required text field
- `email` - unique required text field
- `password` - stored password hash
- `salt` - salt used to hash the password

### `user_sessions`

- `id` - UUID primary key
- `userId` - foreign key to `users.id`
- `createdAt` - timestamp for session creation

## Setup

1. Install dependencies with `pnpm install`.
2. Start PostgreSQL with Docker using `docker compose up -d`.
3. Add a local `.env` file with your database connection string.
4. Push the schema with `pnpm run db:push`.
5. Start the server with `pnpm run dev`.

## Scripts

- `pnpm run dev` - start the app in watch mode
- `pnpm run start` - start the app normally
- `pnpm run db:push` - push schema changes to the database
- `pnpm run db:studio` - open Drizzle Studio

## Notes

- Sensitive values such as database credentials are intentionally not included here.
- Authentication in this project is session-based and relies on the `session-id` request header.
