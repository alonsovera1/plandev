/* const admin = require('../config/firebase');

const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userRecord = await admin.auth().createUser({ email, password });
    res.status(201).json({ uid: userRecord.uid, email: userRecord.email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createUser }; */


const admin = require('../config/firebase');

// Función para registrar un nuevo usuario
const signup = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const userRecord = await admin.auth().createUser({ email, password });
    // Se puede agregar lógica extra, por ejemplo, guardar información adicional en Firestore
    res.status(201).json({
      uid: userRecord.uid,
      email: userRecord.email,
      message: "Usuario creado correctamente"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Función para iniciar sesión o validar el usuario
// Firebase Auth maneja gran parte de la autenticación en el frontend pero es posible incluir alguna lógica personalizada aquí si es necesario.
const signin = async (req, res) => {
  // Nota: En general, la autenticación con Firebase se puede gestionar en el cliente.
  // Esta función se puede usar para operaciones adicionales del backend.
  res.status(200).json({ message: "Endpoint de inicio de sesión" });
};

module.exports = { signup, signin };


