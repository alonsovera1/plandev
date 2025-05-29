// Configuracion de Express

const express = require('express');
const app = express();
const authRoutes = require('../routes/auth');
const { ExpressValidator } = require('express-validator')

// Middleware para parsear JSON
app.use(express.json());

// Servir archivos estáticos desde la carpeta public
app.use(express.static('public'));

// Uso de rutas de autenticación
app.use('/api', authRoutes);

// Otros middlewares, manejo de errores, etc.

module.exports = app;
