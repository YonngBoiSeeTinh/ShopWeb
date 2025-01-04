
const CartService = require("../service/CartService");

const createCart = async (req, res) => {
    try {
        const response = await CartService.createCart(req.body);
        return res.status(response.status === 'OK' ? 200 : 400).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'Internal server error',
            err: error.message,
        });
    }
};

const updateCart = async (req, res) => {
    const { id } = req.params; // Lấy ID từ params
    try {
        const response = await CartService.updateCart(id, req.body);
        return res.status(response.status === 'OK' ? 200 : 400).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'Internal server error',
            err: error.message,
        });
    }
};

const getAllCarts = async (req, res) => {
   
    try {
        const {sort,filter } = req.query
        const response = await CartService.getAllCarts(sort,filter);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'An error occurred while retrieving Carts',
            err: error.message,
        });
    }
};

const getByUserId = async (req, res) => {
    const { userId } = req.params; 
    try {
        const response = await CartService.getByUserId(userId); 
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'An error occurred',
            err: error.message,
        });
    }
};


const deleteCart = async (req, res) => {
    const { id } = req.params; // Lấy ID từ params
    try {
        const response = await CartService.deleteCart(id);
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
    createCart,
    updateCart,
    getAllCarts,
    deleteCart,
    getByUserId
};
