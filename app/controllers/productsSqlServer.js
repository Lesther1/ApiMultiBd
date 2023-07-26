const {httpError} = require('../helpers/handleError')
const { getConnection } = require('../../config/sqlServer');

const getProducts = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM products');
    res.send(result.recordset); // Enviar solo el conjunto de resultados
  } catch (error) {
    httpError(res, e)
  }
};

module.exports = { getProducts };
