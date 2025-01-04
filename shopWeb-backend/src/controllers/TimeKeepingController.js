
const TimeKeepingService = require("../service/TimeKeepingService");

const createTimeKeeping = async (req, res) => {
    try {
        const response = await TimeKeepingService.createTimeKeeping(req.body);
        return res.status(response.status === 'OK' ? 200 : 400).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'Internal server error',
            err: error.message,
        });
    }
};

const updateTimeKeeping = async (req, res) => {
    const { id } = req.params; // Lấy ID từ params
    try {
        const response = await TimeKeepingService.updateTimeKeeping(id, req.body);
        return res.status(response.status === 'OK' ? 200 : 400).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'Internal server error',
            err: error.message,
        });
    }
};

const getTimeKeeping = async (req, res) => {
   
    try {
        const {sort,filter } = req.query
        const response = await TimeKeepingService.getTimeKeeping(sort,filter);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'An error occurred while retrieving TimeKeeping',
            err: error.message,
        });
    }
};

const getByUserId = async (req, res) => {
    const { userId } = req.params; 
    try {
        const {sort,filter } = req.query
        const response = await TimeKeepingService.getByUserId(userId,sort); 
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'An error occurred',
            err: error.message,
        });
    }
};


const deleteTimeKeeping = async (req, res) => {
    const { id } = req.params; // Lấy ID từ params
    try {
        const response = await TimeKeepingService.deleteTimeKeeping(id);
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
    createTimeKeeping,
    updateTimeKeeping,
    getTimeKeeping,
    deleteTimeKeeping,
    getByUserId
};
