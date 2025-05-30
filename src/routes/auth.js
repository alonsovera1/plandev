// Rutas para autenticación en el servidor

const express = require('express');
const { body, validationResult } = require('express-validator');
const { signup, signin } = require('../controllers/authController');
const router = express.Router();

// const admin = require('../config/firebase');
// para las operaciones requeridas (verificación de tokens, gestión de usuarios, etc.)



// Ruta para registrar un usuario (signup)
router.post('/signup', [
  body('email').isEmail().withMessage('Debe ser un email válido'),
  body('uid').notEmpty().withMessage('El uid es obligatorio')
], async (req, res) => {
  // Validación de datos de entrada
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, error: errors.array()[0].msg });
  }
  // Llamada al controlador para registrar al usuario
  await signup(req, res);
});

// Ruta para la de inicio de sesión (signin)
// Ruta es opcional si se implementa lógica adicional en el backend
router.post('/signin', [
  body('email').isEmail().withMessage('Ingresa un email válido'),
  // Si se necesita validar la contraseña acá:
  body('password').notEmpty().withMessage('Ingresa la contraseña')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  await signin(req, res);
});

module.exports = router;


