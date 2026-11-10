# Market Pulse Backend

## Environment Variables

Create a `.env` file at the root of the project with the following:

```env
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/market_pulse?schema=public"
JWT_SECRET="your_jwt_secret"
JWT_EXPIRES_IN="15m"
CORS_ORIGIN="http://localhost:4200"
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

### Update user email

`PATCH /users/email`

**Cookie:**
```
jwt=<your_token>
```

**Body:**
```json
{
  "email": "new_email@example.com"
}
```

**Response:**
```json
{
  "id": 1,
  "email": "new_email@example.com"
}
```

**Error Response (404):**
```json
{
  "statusCode": 404,
  "message": "User not found"
}
```

### Get all products

`GET /products`

**Cookie:**
```
jwt=<your_token>
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Product name",
    "category_id": 1,
    "description": "Product description",
    "unit": "kg",
    "status": 1,
    "category": {
      "id": 1,
      "name": "Category name"
    }
  }
]
```

### Get all categories

`GET /categories`

**Cookie:**
```
jwt=<your_token>
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Category name"
  }
]
```

### Search products by name

`GET /products/search?name=<product_name>`

**Cookie:**
```
jwt=<your_token>
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Product name",
    "category_id": 1,
    "description": "Product description",
    "unit": "kg",
    "status": 1,
    "category": {
      "id": 1,
      "name": "Category name"
    }
  }
]
```

### Create a new product

`POST /products`

**Cookie:**
```
jwt=<your_token>
```

**Body:**
```json
{
  "name": "Product name",
  "category_id": 1,
  "description": "Product description",
  "unit": "kg",
  "status": 1
}
```

**Response:**
```json
{
  "id": 1,
  "name": "Product name",
  "category_id": 1,
  "description": "Product description",
  "unit": "kg",
  "status": 1
}
```

### Update a product

`PATCH /products/:id`

**Cookie:**
```
jwt=<your_token>
```

**Body:**
```json
{
  "name": "Product name",
  "category_id": 1,
  "description": "Product description",
  "unit": "kg",
  "status": 1
}
```

**Response:**
```json
{
  "id": 1,
  "name": "Product name",
  "category_id": 1,
  "description": "Product description",
  "unit": "kg",
  "status": 1
}
```

### Desactivate a product

`PATCH /products/:id/desactivate`

**Cookie:**
```
jwt=<your_token>
```

**Response:**
```json
{
  "affected": 1
}
```
