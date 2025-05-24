require('dotenv').config(); // Cargar las variables de entorno

const express = require('express');
const cors = require('cors');
const http = require('http');

// Inicializar Express y la configuración del puerto
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(express.json());

// Importar las rutas agrupadas
const indexRouter = require('./src/routes/index');
app.use('/', indexRouter);

// Iniciar el servidor
server.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

// variable FIREBASE_SERVICE_ACCOUNT_KEY, que se utiliza en el módulo de Firebase
const admin = require('./src/config/firebase');

// llamada a un metodo sencilla
admin.auth().listUsers(1)
  .then((listUsersResult) => {
    console.log('Usuarios listados:', listUsersResult.users);
  })
  .catch((error) => {
    console.error('Error al listar usuarios:', error);
  });
