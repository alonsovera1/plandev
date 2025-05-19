require('dotenv').config(); // Carga las variables de entorno
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

// Importa las rutas agrupadas, por ejemplo, desde src/routes/index.js
const indexRouter = require('./src/routes/index');
app.use('/', indexRouter);

// Opcional si se usa Socket.io para chat u otras funciones en tiempo real:
/* const socketIo = require('socket.io');
const io = socketIo(server, { cors: { origin: "*" } });
io.on('connection', (socket) => {
  console.log('Un usuario se ha conectado:', socket.id);
  
  // manejar eventos de chat en tiempo real, etc.
  socket.on('disconnect', () => {
    console.log('Un usuario se desconectó:', socket.id);
  });
}); */

// Iniciar el servidor
server.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});



const admin = require('./src/config/firebase');

// llamada a un metodo sencilla
admin.auth().listUsers(1)
  .then((listUsersResult) => {
    console.log('Usuarios listados:', listUsersResult.users);
  })
  .catch((error) => {
    console.error('Error al listar usuarios:', error);
  });
