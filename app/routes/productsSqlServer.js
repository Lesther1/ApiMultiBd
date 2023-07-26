// productsSqlServer.js
const express = require('express');
const router = express.Router();
const { getProducts } = require('../controllers/productsSqlServer');

router.get('/', getProducts);

module.exports = router;