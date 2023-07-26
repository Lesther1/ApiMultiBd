const mongoose = require('mongoose');
const productsModel = require('../app/models/products');

const dbConnect = () => {
  const DB_URI = process.env.DB_URI;
  mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const productsChangeStream = productsModel.watch();

// Manejar los eventos del change stream
productsChangeStream.on('change', (change) => {
  console.log('Change detected in products collection:', change);
  // Aquí puedes ejecutar tus controladores cuando haya cambios relevantes en la colección
});

  const db = mongoose.connection;

  db.on('error', (err) => {
    console.error('Error en la conexión:', err);
  });

  db.once('open', () => {
    console.log('Conexión exitosa a la base de datos');
  });
};

module.exports = { dbConnect };