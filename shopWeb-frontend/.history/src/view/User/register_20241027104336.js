import React, { useState } from "react";
import { Link } from "react-router-dom";
import './log.css';
import axios from "axios";

const Register = ({handleOpenLogin,setAlertMessage,setShowAlert, setType}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        isAdmin : false,
        role:"customer"
    });

    // Cập nhật giá trị các trường form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    
    // Hàm xử lý khi nhấn "Sign up"
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Gửi request tới API backend
        try {
            const response = await axios.post('http://localhost:3001/api/user/sign-up', formData);

            if (response.data.status === 'OK') {
                // Chuyển đến màn hình đăng nhập
                setAlertMessage("Đăng ký thành công");
                setType("success");
                setShowAlert(true);
                handleOpenLogin();
            } 
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setAlertMessage(err.response.data.message);
            } else {
                setAlertMessage("Đăng ký thất bại, vui lòng thử lại.");
            }
            setType("warning");
            setShowAlert(true);
            console.error(err);
        }
    };


    return (
        <div className="login-container signup-container">
            <h2>Sign up</h2>
           
            <form onSubmit={handleSubmit}>
                <div className="form-group-log">
                    <label htmlFor="name">Họ và Tên:</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        placeholder="Enter your name"  
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group-log">
                    <label >Email:</label>
                    <input 
                        type="text" 
                        id="email" 
                        name="email" 
                        placeholder="Enter your email" 
                       
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group-log">
                    <label htmlFor="phone">Số điện thoại:</label>
                    <input 
                        type="text" 
                        id="phone" 
                        name="phone" 
                        placeholder="Enter your phone"  
                        value={formData.phone}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group-log">
                    <label htmlFor="password">Mật khẩu:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="Enter your password"  
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group-log">
                    <label htmlFor="confirmPassword">Xác nhận mật khẩu:</label>
                    <input 
                        type="password" 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        placeholder="Enter confirm password"  
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Đăng ký</button>
            </form>
            <p>
                Đã có tài khoản ?{' '}
                <Link to="#" onClick={handleOpenLogin}>
                   Đăng nhập ngay
                </Link>
            </p>
        </div>
    );
}

export default Register;
