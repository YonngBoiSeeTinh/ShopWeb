const TimeKeeping = require("../model/TimeKeeping");
//order service
const createTimeKeeping = async (newTimeKeeping) => {
    const { userId, date } = newTimeKeeping;
    try {
        const existingTimeKeeping = await TimeKeeping.findOne({ userId, date });
        
        if (existingTimeKeeping) {
            // Cập nhật nếu bản ghi đã tồn tại
            const updatedTimeKeeping = await TimeKeeping.findByIdAndUpdate(
                existingTimeKeeping._id,
                newTimeKeeping,
                { new: true }
            );
            return {
                status: 'OK',
                message: 'TimeKeeping updated successfully',
                data: updatedTimeKeeping,
            };
        }

        // Tạo mới nếu bản ghi chưa tồn tại
        const createdTimeKeeping = await TimeKeeping.create(newTimeKeeping);
        return {
            status: 'OK',
            message: 'TimeKeeping created successfully',
            data: createdTimeKeeping,
        };
    } catch (error) {
        return {
            status: 'ERROR',
            message: 'An error occurred',
            err: error.message,
        };
    }
};

const updateTimeKeeping = async (id, updatedData) => {
    try {
        const timekeeping = await TimeKeeping.findById(id);
        if (!timekeeping) {
            return {
                status: 'FAILED',
                message: 'Timekeeping record not found with the provided ID',
            };
        }

        const updatedTimeKeeping = await TimeKeeping.findByIdAndUpdate(id, updatedData, { new: true });
        return {
            status: 'OK',
            message: 'Timekeeping updated successfully',
            data: updatedTimeKeeping,
        };
    } catch (error) {
        return {
            status: 'ERROR',
            message: 'An error occurred',
            err: error.message,
        };
    }
};

const getTimeKeeping = async ( sort,filter) => {
  
    try {
        const totalTimeKeeping = await TimeKeeping.countDocuments();
      
        if(filter){
            console.log('filter ok');
            const label = filter[0]; // Tên trường cần lọc
            const value = filter[1]; // Giá trị để lọc
        
            // Kiểm tra xem trường có trong sản phẩm không
            const TimeKeepingFilter = await TimeKeeping.find({ [label]: { '$regex': value, '$options': 'i' } }) 
            return {
                status: 'OK',
                message: 'TimeKeeping retrieved successfully',
                data: TimeKeepingFilter,
                total:totalTimeKeeping
            };
        }
        if(sort){
            console.log('sort ok');
            const objectSort ={};
            objectSort[sort[0]] = sort[1];
            console.log('objectSort',objectSort);
            const TimeKeepingSort = await TimeKeeping.find().sort(objectSort); 
            return {
                status: 'OK',
                message: 'TimeKeeping retrieved successfully',
                data: TimeKeepingSort
            };
        }
        const allTimeKeeping  = await TimeKeeping.find();
        return {
            status: 'OK',
            message: 'TimeKeeping retrieved successfully',
            data: allTimeKeeping
        };
    } catch (error) {
        return {
            status: 'ERROR',
            message: 'An error occurred while retrieving TimeKeeping',
            err: error.message,
        };
    }
};
const getByUserId = async (userId,sort) => {
    try {
        if(sort){
            console.log('sort ok');
            const objectSort ={};
            objectSort[sort[0]] = sort[1];
            console.log('objectSort',objectSort);
            const TimeKeepingSort = await TimeKeeping.find({ userId }).sort(objectSort); 
            return {
                status: 'OK',
                message: 'TimeKeeping retrieved successfully',
                data: TimeKeepingSort
            };
        }
        const TimeKeepingItems = await TimeKeeping.find({ userId }); 
        return {
            status: 'OK',
            data: TimeKeepingItems,
        };
    } catch (error) {
        return {
            status: 'ERROR',
            message: 'An error occurred',
            err: error.message,
        };
    }
};
const deleteTimeKeeping = async (id) => {
    try {
        const deletedOrder = await TimeKeeping.findByIdAndDelete(id);
        if (!deletedOrder) {
            return {
                status: 'FAILED',
                message: 'Order not found',
            };
        }

        return {
            status: 'OK',
            message: 'Order deleted successfully',
            data: deletedOrder,
        };
    } catch (error) {
        return {
            status: 'ERROR',
            message: 'An error occurred while deleting the Order',
            err: error.message,
        };
    }
};

module.exports = {
    createTimeKeeping,
    updateTimeKeeping,
    getTimeKeeping,
    deleteTimeKeeping,
    getByUserId
};
