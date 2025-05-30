// Controlador para autenticacion

const admin = require('../config/firebase');

// Función para registrar un nuevo usuario
const signup = async (req, res) => {
  const { uid, email } = req.body;
  try {
    // Definir un username predeterminado a partir del correo
    const username = email.split('@')[0];
    
    // Guarda datos adicionales en Firestore
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


