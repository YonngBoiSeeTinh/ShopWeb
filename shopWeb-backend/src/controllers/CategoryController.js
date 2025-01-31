
const CategoryService = require("../service/CategoryService ");

const createCategory = async (req, res) => {
    try {
        const response = await CategoryService.createCategory(req.body);
        return res.status(response.status === 'OK' ? 200 : 400).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'Internal server error',
            err: error.message,
        });
    }
};

const updateCategory = async (req, res) => {
    const { id } = req.params; // Lấy ID từ params
    try {
        const response = await CategoryService.updateCategory(id, req.body);
        return res.status(response.status === 'OK' ? 200 : 400).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'Internal server error',
            err: error.message,
        });
    }
};

const getAllCategorys = async (req, res) => {
   
    try {
        const {page,limit,sort,filter } = req.query
        const response = await CategoryService.getAllCategorys(Number(limit) , Number(page)||0,sort,filter);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'An error occurred while retrieving Categorys',
            err: error.message,
        });
    }
};

const deleteCategory = async (req, res) => {
    const { id } = req.params; // Lấy ID từ params
    try {
        const response = await CategoryService.deleteCategory(id);
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
    createCategory,
    updateCategory,
    getAllCategorys,
    deleteCategory,
};
