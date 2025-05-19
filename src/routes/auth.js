const express = require('express');
const { body, validationResult } = require('express-validator');
const { signup, signin } = require('../controllers/authController');

const router = express.Router();

// Ruta para registrar un usuario (signup)
router.post('/signup', [
  body('email').isEmail().withMessage('Debe ser un email válido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
], async (req, res) => {
  // Validación de datos de entrada
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Llamada al controlador para registrar al usuario
  await signup(req, res);
});

// Ruta para iniciar sesión
router.post('/signin', async (req, res) => {
  // Llamada al controlador para iniciar sesión
  await signin(req, res);
});

module.exports = router;

