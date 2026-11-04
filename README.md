# Market Pulse Backend

## Environment Variables

Create a `.env` file at the root of the project with the following:

```env
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/market_pulse?schema=public"
```

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API Endpoints

### Register a new user

`POST /auth/register`

**Body:**
```json
{
  "email": "user@example.com",
  "password": "your_password"
}
```

**Response:**
```json
{
  "id": 1,
  "email": "user@example.com",
  "status": 1
}
```
