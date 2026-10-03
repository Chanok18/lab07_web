import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/users.routes.js';
import pageRoutes from './routes/pages.routes.js';
import seedRoles from './utils/seedRoles.js';
import seedUsers from './utils/seedUsers.js';
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Motor de plantillas EJS + archivos estáticos (JS/CSS del frontend)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.locals.guarded = false;
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.get('/health', (req, res) => res.status(200).json({ ok: true }));

// Páginas del frontend
app.use('/', pageRoutes);

// 404: JSON para la API, página EJS para el resto
app.use((req, res) => {
    if (req.path.startsWith('/api/')) return res.status(404).json({ message: 'Ruta no encontrada' });
    res.status(404).render('404', { title: 'Página no encontrada' });
});

app.use((err, req, res, next) => {
    console.error(err);
    let status = err.status || 500;
    let message = err.message || 'Error interno del servidor';

    if (err.name === 'ValidationError') {
        status = 400;
        message = Object.values(err.errors).map(e => e.message).join('. ');
    } else if (err.code === 11000) {
        status = 400;
        message = 'El email ya se encuentra en uso';
    } else if (err.name === 'CastError') {
        status = 404;
        message = 'Usuario no encontrado';
    }
    res.status(status).json({ message });
});

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, { autoIndex: true })
    .then( async () => {
        console.log('Mongo connected');
        await seedRoles();
        await seedUsers();
        app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
    })
    .catch(err => {
        console.error('Error al conectar con Mongo:', err);
        process.exit(1);
    });
