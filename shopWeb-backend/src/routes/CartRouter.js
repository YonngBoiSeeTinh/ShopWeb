const express = require("express");
const router= express.Router();
const cartController = require('../controllers/CarttController');

router.post('/create', cartController.createCart);
router.put('/update/:id', cartController.updateCart);
router.get('/get', cartController.getAllCarts);
router.get('/getByUserId/:userId', cartController.getByUserId);
router.delete('/delete/:id', cartController.deleteCart);
module.exports = router;