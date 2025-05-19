// src/routes/index.js
const express = require('express');
const router = express.Router();

// Ruta base: por ejemplo, para verificar que la API está funcionando.
router.get('/', (req, res) => {
  res.json({ message: "PlanDev API is working!" });
});

module.exports = router;
