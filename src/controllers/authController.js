// Controlador para autenticacion

const admin = require('../config/firebase');
const User = require('../models/User');

// Función para registrar un nuevo usuario
/* const signup = async (req, res) => {
  const { uid, email} = req.body;
  try {
    // Opcional: Puedes asignar un valor predeterminado para el username, ej. la parte antes del @
    const username = email.split('@')[0];

    // Validar que el nombre de usuario no esté ya en uso
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false, error: "El nombre de usuario ya está en uso" });
    }
    // Crear el usuario en la base de datos
    const newUser = await User.create({ uid, email, username });
    res.status(201).json({ success: true, data: newUser, message: "Usuario creado correctamente" });
  } catch (error) {
    console.error("Error en signup:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}; */

/* 
const signup = async (req, res) => {
  // Recibes en el payload el uid y el email desde el frontend.
  // En lugar de comprobar o crear un usuario en una base de datos (MongoDB),
  // simplemente responde con éxito.
  try {
    
    return res.status(201).json({ 
      success: true, 
      message: "Usuario creado correctamente en Firebase" 
    });
  } catch (error) {
    console.error("Error en signup:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}; */

const signup = async (req, res) => {
  const { uid, email } = req.body;
  try {
    // Por ejemplo, definir un username predeterminado:
    const username = email.split('@')[0];
    
    // Guarda datos adicionales en Firestore:
    await admin.firestore().collection('users').doc(uid).set({
      email,
      username,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    return res.status(201).json({ 
      success: true, 
      message: "Usuario creado y datos guardados en Firestore" 
    });
  } catch (error) {
    console.error("Error en signup:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};


// Función para el inicio de sesión (si se necesita lógica adicional)
const signin = async (req, res) => {
  // Como Firebase Auth maneja la autenticación en el cliente,
  // este endpoint se puede usar para operaciones adicionales o para crear registros de sesión.
  res.status(200).json({ success: true, message: "Endpoint de inicio de sesión" });
};


module.exports = { signup, signin };


