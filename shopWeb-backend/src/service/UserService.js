const User = require("../model/UserModel"); // Import model User từ MongoDB
const TimeKeeping = require("../model/TimeKeeping");
const Order = require("../model/OrderModel");
const bcrypt = require("bcrypt"); 
const { generalAccessToken } = require('./JwtService');
const {generalRefreshToken}  = require('./JwtService');


const createUser = async (newUser) => {
    const { name, email, password, phone, isAdmin, address, avatar,role  } = newUser;

    try {
        // Kiểm tra xem email đã tồn tại hay chưa
        const checkUser = await User.exists({ email });

        if (checkUser) {
            return {
                status: 'ERR',
                message: 'Email đã tồn tại'
            };
        }

        // Băm mật khẩu
        const hash = await bcrypt.hash(password, 10);

        // Tạo user mới
        const createdUser = await User.create({
            name, 
            email, 
            password:hash,
            phone,
            isAdmin, 
            address, 
            avatar,
            role
        });

        if (createdUser) {
            return {
                status: 'OK',
                message: 'Đăng ký thành công',
                data: createdUser
            };
        } else {
            return {
                status: 'ERR',
                message: 'Có lỗi xảy ra khi đăng ký'
            };
        }

    } catch (e) {
        return {
            status: 'ERR',
            message: 'An error occurred',
            err: e
        };
    }
};


const loginUser = async (user) => {
    const { email, password } = user;

    try {
        // Kiểm tra xem email có tồn tại không
        const checkUser = await User.findOne({ email: email });
        
        if (checkUser === null) {
            return {
                status: 'FAILED',
                message: 'Email không tồn tại'
            };
        }
        
        // So sánh mật khẩu
        const comparePass = bcrypt.compareSync(password, checkUser.password);
        
        if (!comparePass) {
            return {
                status: 'FAILED',
                message: 'Mật khẩu không đúng'
            };
        }
        
        // Tạo access_token và refresh_token
        const access_token = await generalAccessToken({
            id: checkUser.id,
            isAdmin: checkUser.isAdmin
        });
        const refresh_token = await generalRefreshToken({
            id: checkUser.id,
            isAdmin: checkUser.isAdmin
        });
        
        // Trả về token và thông tin đăng nhập thành công
        return {
            status: 'OK',
            message: 'Đăng nhập thành công',
            data: {
                access_token,
                refresh_token
            }
        };

    } catch (e) {
        // Xử lý lỗi và trả về thông tin lỗi
        return {
            status: 'FAILED',
            message: 'Đã xảy ra lỗi trong quá trình đăng nhập',
            error: e.message,        // Lấy thông báo lỗi
            stack: e.stack           // Lấy stack trace của lỗi để debug
        };
    }
};


const updateUser = async (id, updatedData) => {
    try {
        // Tìm người dùng theo ID
        const user = await User.findById(id);

        if (!user) {
            return {
                status: 'FAILED',
                message: 'User not found'
            };
        }

        // Kiểm tra xem email có bị thay đổi và đã tồn tại hay chưa
        if (updatedData.email && updatedData.email !== user.email) {
            const checkUser = await User.findOne({ email: updatedData.email });
            if (checkUser) {
                return {
                    status: 'ERR',
                    message: 'Email đã tồn tại'
                };
            }
        }

        // Cập nhật mật khẩu nếu có
        if (updatedData.password) {
            const hash = bcrypt.hashSync(updatedData.password, 10);
            updatedData.password = hash; // Mã hóa mật khẩu mới
        }

        // Cập nhật thông tin người dùng
        const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true });

        return {
            status: 'OK',
            message: 'User updated successfully',
            data: updatedUser
        };

    } catch (e) {
        // Xử lý lỗi và trả về lỗi
        return {
            status: 'ERROR',
            message: 'An error occurred',
            err: e
        };
    }
};
const getAllUsers = async (limit ,page, sort,filter) => {
    const totalProduct = await User.countDocuments();
    try {
        if(filter){
            console.log('filter ok');
            const label = filter[0]; // Tên trường cần lọc
            const value = filter[1]; // Giá trị để lọc
            const productFilter = await User.find({ [label]: { '$regex': value, '$options': 'i' } }) // '$options': 'i' để không phân biệt chữ hoa chữ thường
            .limit(limit)
            .skip(page * limit);
             return {
                status: 'OK',
                message: 'Products retrieved successfully',
                data: productFilter,
                total:totalProduct,
                pageCurrent :Number(page)+1,
                totalPage : Math.ceil(totalProduct/limit),
            };
        }
        if(sort){
            console.log('sort ok');
            const objectSort ={};
            objectSort[sort[0]] = sort[1];
            console.log('objectSort',objectSort);
            const productSort = await User.find().limit(limit).skip(page*limit).sort(objectSort); 
            return {
                status: 'OK',
                message: 'Products retrieved successfully',
                data: productSort,
                total:totalProduct,
                pageCurrent :Number(page)+1,
                totalPage : Math.ceil(totalProduct/limit),
            };
        }
        const users = await User.find().limit(limit).skip(page*limit);
        return {
            status: 'OK',
            message: 'Users retrieved successfully',
            data: users,
            total:totalProduct,
            pageCurrent :Number(page)+1,
            totalPage : Math.ceil(totalProduct/limit),
        };
    } catch (error) {
        return {
            status: 'ERROR',
            message: 'An error occurred while retrieving users',
            err: error.message,
        };
    }
};
const getDetailUser = async (id) => {
    // Logic để lấy thông tin chi tiết của người dùng từ cơ sở dữ liệu dựa trên ID
    const user = await User.findById(id); 
    if (!user) {
        throw new Error('User not found');
    }
    return {
        status: 'OK',
        data: user
    };
};
const deleteUser = async (id) => {
    try {
        // Tìm và xóa người dùng theo ID
        const deletedUser = await User.findByIdAndDelete(id);
        const hasOrders = await Order.findOne({ userId: id });
        const hasTimeKeepingRecords = await TimeKeeping.findOne({ userId: id });
        
        // Nếu tồn tại trong Order hoặc TimeKeeping, xóa tất cả các bản ghi liên quan
        if (hasOrders) {
            await Order.deleteMany({ userId: id });
        }
        
        if (hasTimeKeepingRecords) {
            await TimeKeeping.deleteMany({ userId: id });
        }
        if (!deletedUser) {
            return {
                status: 'FAILED',
                message: 'User not found'
            };
        }

        return {
            status: 'OK',
            message: 'User deleted successfully',
            data: deletedUser
        };
    } catch (error) {
        return {
            status: 'ERROR',
            message: 'An error occurred while deleting the user',
            err: error.message
        };
    }
};

const logout = async (id) => {
   
};


// các hàm
module.exports = {
    createUser,
    loginUser,
    updateUser,
    getAllUsers,
    deleteUser,
    getDetailUser,
    logout
    
};
