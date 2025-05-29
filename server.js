require('dotenv').config(); // Cargar las variables de entorno

const express = require('express');
const cors = require('cors');
const http = require('http');

// Inicializar Express y la configuración del puerto
// const app = express();
const app = require('./src/server/app');
const server = http.createServer(app);
const port = process.env.PORT || 3000;

// Configuración personalizada de CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [];
const corsOptions = {
  origin: function (origin, callback) {
    // Permite peticiones sin origin (ej desde herramientas como Postman)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`Origen no permitido: ${origin}`));
    }
  },
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));  // Aplica CORS con opciones

// Middlewares globales
app.use(express.json());

// Importar las rutas agrupadas
const indexRouter = require('./src/routes/index');
app.use('/', indexRouter);

// Iniciar el servidor
server.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

// variable FIREBASE_SERVICE_ACCOUNT_KEY
const admin = require('./src/config/firebase');

// Verificar si la llamada (TEST PARA ENTORNO DE DESARROLLO)
if (process.env.NODE_ENV === 'development') {
  admin.auth().listUsers(1)
    .then((listUsersResult) => {
      console.log('Usuarios listados:', listUsersResult.users);
    })
    .catch((error) => {
      console.error('Error al listar usuarios:', error);
    });
}

admin.auth().listUsers(1)
  .then((listUsersResult) => {
    console.log('Usuarios listados:', listUsersResult.users);
  })
  .catch((error) => {
    console.error('Error al listar usuarios:', error);
  });


