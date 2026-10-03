# Express + MongoDB + EJS + Materialize (Auth con JWT)

## Instalación
```bash
npm install          # instala también ejs
cp .env.example .env # y ajusta MONGODB_URI / JWT_SECRET
npm run dev          # o npm start  ->  http://localhost:3000
```

## Usuarios creados automáticamente (src/utils/seedUsers.js, se llama desde server.js)
| Rol   | Email             | Password   |
|-------|-------------------|------------|
| admin | admin@example.com | Admin@1234 |
| user  | user@example.com  | User@1234  |

## Páginas
`/signIn` · `/signUp` · `/profile` · `/dashboard` (user o superior) · `/admin/dashboard` (solo admin) · `/403` · cualquier otra ruta => 404

## API
| Método | Ruta                 | Acceso |
|--------|----------------------|--------|
| POST   | /api/auth/signUp     | público (siempre rol user) |
| POST   | /api/auth/signIn     | público |
| GET    | /api/users/me        | logueado |
| PUT    | /api/users/me        | logueado (edita sus datos) |
| GET    | /api/users           | admin |
| GET    | /api/users/:id       | admin |

## Comandos mongosh para las capturas
```js
use auth_db
db.users.find({}, { password: 0 }).pretty()
db.roles.find().pretty()
db.users.countDocuments()
```
