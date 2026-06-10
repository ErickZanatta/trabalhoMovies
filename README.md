# 🎬 MovieTime API

A RESTful API built with **Node.js**, **Express** and **Sequelize** (MySQL) for managing a personal movie list.

---

## 📋 Prerequisites

- Node.js 18+
- MySQL (or PostgreSQL — see configuration section)

---

## ⚙️ Configuration

Create a `.env` file in the project root (same level as `package.json`):

```env
PORT=3000

DB_NAME=movietime_db
DB_USER=root
DB_PASS=yourpassword
DB_HOST=localhost
DB_PORT=3306
DB_DIALECT=mysql      # or postgres
```

> **Note:** Sequelize will create the `movies` table automatically on first run via `sync({ alter: true })`.

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the development server (with auto-reload)
npm run dev

# 3. Or start in production mode
npm start
```

The server will start at `http://localhost:3000`.

---

## 🗂️ Project Structure

```
movietime-api/
├── src/
│   ├── app.js                   # Express entry point & middlewares
│   ├── database/
│   │   └── connection.js        # Sequelize connection & sync
│   ├── models/
│   │   └── Movie.js             # Movie model definition
│   ├── controllers/
│   │   └── movieController.js   # CRUD business logic
│   └── routes/
│       └── movieRoutes.js       # Express route definitions
├── package.json
└── .env                         # Environment variables (not committed)
```

---

## 📡 Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/movies` | List all movies |
| `POST` | `/api/movies` | Create a movie |
| `GET` | `/api/movies/:id` | Get movie by ID |
| `PUT` | `/api/movies/:id` | Update movie by ID |
| `DELETE` | `/api/movies/:id` | Delete movie by ID |

All responses follow this shape:

```json
{
  "success": true,
  "data": { ... },
  "message": "Human-readable status message."
}
```

---

## 🧪 Request Examples

### Create a movie
```http
POST /api/movies
Content-Type: application/json

{
  "title": "Inception",
  "director": "Christopher Nolan",
  "watched": false
}
```

### List all movies
```http
GET /api/movies
```

### Get a specific movie
```http
GET /api/movies/1
```

### Update a movie
```http
PUT /api/movies/1
Content-Type: application/json

{
  "watched": true
}
```

### Delete a movie
```http
DELETE /api/movies/1
```

---

## 🔒 Validation & Error Handling

| Scenario | HTTP Status |
|----------|-------------|
| Missing or empty `title` on create | `400 Bad Request` |
| Movie ID not found | `404 Not Found` |
| Sequelize validation error | `400 Bad Request` |
| Unexpected server error | `500 Internal Server Error` |

---

## 🛠️ Switching to PostgreSQL

1. Install the pg driver:
   ```bash
   npm install pg pg-hstore
   ```
2. Update `.env`:
   ```env
   DB_DIALECT=postgres
   DB_PORT=5432
   ```

That's it — no code changes required.
