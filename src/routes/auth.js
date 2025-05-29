// Rutas para autenticación en el servidor

const express = require('express');
const { body, validationResult } = require('express-validator');
const { signup, signin } = require('../controllers/authController');
const router = express.Router();

// const admin = require('../config/firebase');
// para las operaciones requeridas (verificación de tokens, gestión de usuarios, etc.)


// Ruta para registrar un usuario (signup)
router.post('/signup', [
  body('email').isEmail().withMessage('Debe ser un email válido')
  // body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
], async (req, res) => {
  // Validación de datos de entrada
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
     return res.status(400).json({ success: false, error: errors.array()[0].msg });
  }
  // Llamada al controlador para registrar al usuario
  await signup(req, res);
});


// Ruta para la ruta de inicio de sesión (signin)
router.post('/signup', [
  body('email').isEmail().withMessage('Debe ser un email válido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
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


module.exports = router;


