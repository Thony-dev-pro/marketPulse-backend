# Market Pulse Backend

## Environment Variables

Create a `.env` file at the root of the project with the following:

```env
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/market_pulse?schema=public"
JWT_SECRET="your_jwt_secret"
JWT_EXPIRES_IN="15m"
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

### Login

`POST /auth/login`

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
  "user": {
    "id": 1,
    "email": "user@example.com",
    "status": 1
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (401):**
```json
{
  "statusCode": 401,
  "message": "Invalid credentials"
}
```
