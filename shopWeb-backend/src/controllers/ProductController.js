
const ProductService = require("../service/ProductService");

const createProduct = async (req, res) => {
    try {
        const response = await ProductService.createProduct(req.body);
        return res.status(response.status === 'OK' ? 200 : 400).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'Internal server error',
            err: error.message,
        });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params; // Lấy ID từ params
    try {
        const response = await ProductService.updateProduct(id, req.body);
        return res.status(response.status === 'OK' ? 200 : 400).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'Internal server error',
            err: error.message,
        });
    }
};
const updateProductStock  = async (req, res) => {
    const { id } = req.params; // Lấy productId từ params
    console.log(id)
    const { color, amount } = req.body;
    try {
        const response = await ProductService.updateProductStock(id,color, amount);
        return res.status(response.status === 'OK' ? 200 : 400).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'Internal server error',
            err: error.message,
        });
    }
};

const getAllProducts = async (req, res) => {
   
    try {
        const {page,limit,sort,filter } = req.query
        const response = await ProductService.getAllProducts(Number(limit) , Number(page)||0,sort,filter);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'An error occurred while retrieving products',
            err: error.message,
        });
    }
};
const getDetail = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await ProductService.getDetail(id); 
        if (!product) {
            return res.status(404).json({
                status: 'ERROR',
                message: 'Product not found',
            });
        }
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'An error occurred while retrieving the product',
            err: error.message,
        });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params; // Lấy ID từ params
    try {
        const response = await ProductService.deleteProduct(id);
        return res.status(response.status === 'OK' ? 200 : 400).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'Internal server error',
            err: error.message,
        });
    }
};

module.exports = {
    createProduct,
    updateProduct,
    getAllProducts,
    deleteProduct,
    getDetail,
    updateProductStock,
};
