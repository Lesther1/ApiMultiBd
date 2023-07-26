const {httpError} = require('../helpers/handleError')
const productsModel = require ('../models/products')
const getProducts = async (req, res) =>{
    try {
        const listAll = await productsModel.find({})
        res.send({ data : listAll}) 
    } catch (error) {
        httpError(res, e)
    }
}

const getProduct = async (req, res) => {
  const productId = req.params.productId;
  try {
    const product = await productsModel.findById(productId);
    if (!product) {
      return res.status(404).send({ error: 'Product not found' });
    }
    res.send({ data: product });
  } catch (error) {
    httpError(res, error);
  }
};

module.exports = {getProduct,getProducts}