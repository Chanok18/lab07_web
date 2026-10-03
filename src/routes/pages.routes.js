import express from 'express';

const router = express.Router();

// Las páginas son "shells" EJS: el contenido real se carga con fetch + JWT desde sessionStorage.
// La protección (login / rol) la aplica public/js/auth.js en el navegador y,
// de forma definitiva, los middlewares authenticate/authorize en la API.
router.get('/', (req, res) => res.redirect('/signIn'));
router.get('/signIn', (req, res) => res.render('signIn', { title: 'Iniciar sesión' }));
router.get('/signUp', (req, res) => res.render('signUp', { title: 'Registro' }));
router.get('/profile', (req, res) => res.render('profile', { title: 'Mi cuenta', guarded: true }));
router.get('/dashboard', (req, res) => res.render('dashboard', { title: 'Dashboard', guarded: true }));
router.get('/admin/dashboard', (req, res) => res.render('adminDashboard', { title: 'Dashboard admin', guarded: true }));
router.get('/403', (req, res) => res.status(403).render('403', { title: 'Acceso denegado' }));

export default router;
