# Jules

Express API starter with security-first architecture.

## Tech Stack

- **Runtime:** Node.js 24
- **Framework:** Express 5
- **Security:** Helmet, CORS, express-rate-limit
- **Validation:** express-validator
- **Testing:** Jest 30 + Supertest

## Commands

```bash
npm start          # Start server
npm test           # Run tests (Jest)
```

## Conventions

- Routes in `src/` with `server.js` as entry point
- Tests mirror source structure in `test/`
- Input validation on all POST/PUT routes
- Security middleware applied globally
- Environment config via `dotenv`

## Project Structure

```
src/server.js    # App entry + routes
test/            # Test files mirroring src/
```
