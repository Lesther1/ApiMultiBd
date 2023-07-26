const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const pathRouter = __dirname;

const removeExtension = (fileName) => {
    return fileName.split('.').shift();
}

fs.readdirSync(pathRouter).filter((file) => {
    const fileWithoutExt = removeExtension(file);
    const skip = ['index'].includes(fileWithoutExt);
    if (!skip) {
        const routePath = path.join(pathRouter, file);
        router.use(`/${fileWithoutExt}`, require(routePath));
        console.log('-->', fileWithoutExt);
    }
});

// Ruta 404 para manejar solicitudes a rutas no definidas
router.use((req, res, next) => {
    res.status(404).send({ error: 'Not Found' });
});

module.exports = router;

