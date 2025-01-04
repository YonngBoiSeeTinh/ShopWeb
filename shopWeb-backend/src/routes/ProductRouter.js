const express = require("express");
const router= express.Router();
const productController = require('../controllers/ProductController');

router.post('/create', productController.createProduct);
router.put('/update/:id', productController.updateProduct);
router.put('/updateStock/:id', productController.updateProductStock);
router.get('/get', productController.getAllProducts);
router.get('/getDetail/:id', productController.getDetail);
router.delete('/delete/:id', productController.deleteProduct);
module.exports = router;