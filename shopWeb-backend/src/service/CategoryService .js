const Category = require("../model/CategoryModel");
const Product  =  require("../model/ProductModel")
const createCategory = async (newCategory) => {
    try {
      
        const existingCategory = await Category.findOne({ name: newCategory.name });
        if (existingCategory) {
            return {
                status: 'ERR',
                message: 'Tên danh mục đã được đăng ký!',
            };
        }

        const createdCategory = await Category.create(newCategory);
        return {
            status: 'OK',
            message: 'Category created successfully',
            data: createdCategory,
        };
    } catch (error) {
        return {
            status: 'ERROR',
            message: 'An error occurred',
            err: error.message,
        };
    }
};

const updateCategory = async (id, updatedData) => {
    try {
        const CategoryFind = await Category.findById(id);
        if (!CategoryFind) {
            return {
                status: 'FAILED',
                message: 'Category not found',
            };
        }
        const updatedCategory = await Category.findByIdAndUpdate(id, updatedData, { new: true });
        return {
            status: 'OK',
            message: 'Category updated successfully',
            data: updatedCategory,
        };
    } catch (error) {
        return {
            status: 'ERR',
            message: 'An error occurred',
            err: error.message,
        };
    }
};

const getAllCategorys = async (limit =20,page=0, sort,filter) => {
  
    try {
        const totalCategory = await Category.countDocuments();
      
        if(filter){
            console.log('filter ok');
            const label = filter[0]; // Tên trường cần lọc
            const value = filter[1]; // Giá trị để lọc
        
            // Kiểm tra xem trường có trong sản phẩm không
            const CategoryFilter = await Category.find({ [label]: { '$regex': value, '$options': 'i' } }) // '$options': 'i' để không phân biệt chữ hoa chữ thường
                .limit(limit)
                .skip(page * limit);
            return {
                status: 'OK',
                message: 'Categorys retrieved successfully',
                data: CategoryFilter,
                total:totalCategory,
                pageCurrent :Number(page)+1,
                totalPage : Math.ceil(totalCategory/limit),
            };
        }
        if(sort){
            console.log('sort ok');
            const objectSort ={};
            objectSort[sort[0]] = sort[1];
            console.log('objectSort',objectSort);
            const CategorySort = await Category.find().limit(limit).skip(page*limit).sort(objectSort); 
            return {
                status: 'OK',
                message: 'Categorys retrieved successfully',
                data: CategorySort,
                total:totalCategory,
                pageCurrent :Number(page)+1,
                totalPage : Math.ceil(totalCategory/limit),
            };
        }
        const Categorys = await Category.find().limit(limit).skip(page*limit);
        return {
            status: 'OK',
            message: 'Categorys retrieved successfully',
            data: Categorys,
            total:totalCategory,
            pageCurrent :Number(page)+1,
            totalPage : Math.ceil(totalCategory/limit),
        };
    } catch (error) {
        return {
            status: 'ERROR',
            message: 'An error occurred while retrieving Categorys',
            err: error.message,
        };
    }
};

const deleteCategory = async (id) => {
    try {
        // const orderUpdateResult = await Product.updateMany(
        //     { category: id },
        //     { $pull: { category: id } } 
        // );
        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) {
            return {
                status: 'FAILED',
                message: 'Category not found',
            };
        }

        return {
            status: 'OK',
            message: 'Category deleted successfully',
            data: deletedCategory,
        };
    } catch (error) {
        return {
            status: 'ERROR',
            message: 'An error occurred while deleting the Category',
            err: error.message,
        };
    }
};

module.exports = {
    createCategory,
    updateCategory,
    getAllCategorys,
    deleteCategory,   
};
