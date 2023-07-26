// Importar y cargar las variables de entorno desde el archivo .env
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express(); // Llamar a la función express para crear la instancia de la aplicación
const { dbConnect } = require('./config/mongo');
const { getConnection } = require('./config/sqlServer');
const PORT = process.env.PORT || 5001;

// Configurar CORS para permitir solicitudes desde otros dominios
app.use(cors());

app.use('/api/1.0', require('./app/routes'))
// Conectar a la base de datos
const dbType = process.env.DB_TYPE;
if (dbType === 'mongo') {
    dbConnect();
  } else if (dbType === 'sqlserver') {
    getConnection();
  } else {
    console.error('Tipo de base de datos no válido en .env');
    process.exit(1);
  }

// Iniciar el servidor y escuchar en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});