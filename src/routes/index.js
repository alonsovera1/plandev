const express = require('express');
const router = express.Router();

// Ruta base para probar que la API está funcionando
router.get('/', (req, res) => {
  res.json({ message: "PlanDev API is working!" });
});

// Importar y usar las rutas de autenticación
const authRoutes = require('./auth');
router.use('/auth', authRoutes);


module.exports = router;
