const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authMiddleWare = (req, res, next) => {
    const token = req.headers.token?.split(" ")[1];  // Kiểm tra sự tồn tại của token
    if (!token) {
        return res.status(401).json({
            message: "Token không được cung cấp.",
            status: "Error"
        });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(401).json({
                message: "Token không hợp lệ hoặc hết hạn.",
                status: "Error"
            });
        }

        if (user?.isAdmin) {
            next();  // Nếu là admin, tiếp tục xử lý
        } else {
            return res.status(403).json({
                message: "Không có quyền truy cập.",
                status: "Error"
            });
        }
    });
};

const authUserMiddleWare = (req, res, next) => {
    const token = req.headers.token?.split(" ")[1];  // Kiểm tra sự tồn tại của token
    if (!token) {
        return res.status(401).json({
            message: "Token không được cung cấp.",
            status: "Error"
        });
    }
    
    const userId = req.params.id;
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(401).json({
                message: "Token không hợp lệ hoặc hết hạn.",
                status: "Error"
            });
        }

        console.log('user:', user);  // Kiểm tra lại user đã được giải mã đúng chưa

        if (user?.isAdmin || user?.id === userId) {
            next();  // Tiếp tục nếu là admin hoặc user đang yêu cầu chính mình
        } else {
            return res.status(403).json({
                message: "Không có quyền truy cập.",
                status: "Error"
            });
        }
    });
};

module.exports = {
    authMiddleWare,
    authUserMiddleWare
};
