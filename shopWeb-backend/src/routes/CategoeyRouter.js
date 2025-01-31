const express = require("express");
const router= express.Router();
const categoryController = require('../controllers/CategoryController');

router.post('/create', categoryController.createCategory);
router.put('/update/:id', categoryController.updateCategory);
router.get('/get', categoryController.getAllCategorys);
router.delete('/delete/:id', categoryController.deleteCategory);
module.exports = router;