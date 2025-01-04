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
            } else {
                setAlertMessage(response.data.message);
                setType("notify");
                setShowAlert(true);
            }
        } catch (err) {
            setAlertMessage("Đăng ký thất bại, vui lòng thử lại.");
            setType("error");
            setShowAlert(true);
            console.error(err);
        }
    };


    return (
        <div className="login-container signup-container">
            <h2>Sign up</h2>
           
            <form onSubmit={handleSubmit}>
                <div className="form-group-log">
                    <label htmlFor="name">Name:</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        placeholder="Enter your name" 
                        required 
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group-log">
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="Enter your email" 
                        required 
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group-log">
                    <label htmlFor="phone">Phone:</label>
                    <input 
                        type="text" 
                        id="phone" 
                        name="phone" 
                        placeholder="Enter your phone" 
                        required 
                        value={formData.phone}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group-log">
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="Enter your password" 
                        required 
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group-log">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input 
                        type="password" 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        placeholder="Enter confirm password" 
                        required 
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Sign up</button>
            </form>
            <p>
                Already have an account?{' '}
                <Link to="#" onClick={handleOpenLogin}>
                    Sign in here
                </Link>
            </p>
        </div>
    );
}

export default Register;
