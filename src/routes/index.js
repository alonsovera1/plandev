const express = require('express');
const router = express.Router();

// Ruta base para probar que la API está funcionando
router.get('/', (req, res) => {
  res.json({ message: "PlanDev API is working!" });
});

// Importa y usa las rutas de autenticación
const authRoutes = require('./auth');
router.use('/auth', authRoutes);

// Aquí se puede integrar otras rutas, por ejemplo, para proyectos, chat, etc.
// const projectsRoutes = require('./projects');
// router.use('/projects', projectsRoutes);

module.exports = router;
