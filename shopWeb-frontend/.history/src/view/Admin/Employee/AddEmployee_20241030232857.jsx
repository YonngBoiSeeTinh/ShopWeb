import React, { useState,useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Order from '../Order/Order'
import { useLocation } from "react-router-dom";

function UserPage({ setAlertMessage,setShowAlert, setType }) {
    
    const [avatar, setAvatar] = useState("");
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        isAdmin : false,
        avatar:avatar,
        role:"employee"
    });

    // Cập nhật giá trị các trường form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    
   
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageUrl = e.target.result;
                setAvatar(imageUrl); // Cập nhật avatar xong mới gọi handleSaveAvatar
            };
            reader.readAsDataURL(file);
        }
    };
    const handleSubmit =async(e)=>{
        e.preventDefault();
        console.log('formdata', formData);
       
        try {
            const response = await axios.post('http://localhost:3001/api/user/sign-up', formData);
           
            if (response.data.status === 'OK') {
            
                setAlertMessage("Thêm mới thành công");
                setType("success");
                setShowAlert(true);
                
            }
            else{
                setAlertMessage(response.data.message);
                setShowAlert(true);
                setType("warning");
            } 
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setAlertMessage(err.response.data.message);  
            } else {
                setAlertMessage("Thêm mới thất bại, vui lòng thử lại.");
            }
            setType("warning");
            setShowAlert(true);
            console.error(err);
        }

    }

    return (
        <div style={{height:"100vh", marginTop:"130px " }}>
            <form className="user-page" onSubmit={handleSubmit}>
                <div className="user-profile">
                    <input type="file" id="fileInput" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                    <div className="avatar-section" onClick={() => document.getElementById('fileInput').click()}>
                        <img src={(avatar?avatar:"https://cdn-icons-png.flaticon.com/512/4211/4211763.png")} alt="avatar" className="user-avatar" />
                    </div>
                    <div className="user-info" >
                        <div style={{ display: 'flex', marginBottom:"15px" }}>
                        <div className="table_row-header"  style={{background:"none"}}>Tên:</div>
                            <input className="table_row-infor" onChange={handleInputChange}
                            style={{minWidth:"400px"}} name="name"/>
                        </div>
                        <div style={{ display: 'flex' }}>
                        <div className="table_row-header" style={{background:"none"}}>Email:</div>
                            <input className="table_row-infor" onChange={handleInputChange}
                             style={{minWidth:"400px"}} name="email" />
                        </div>
                        
                    </div>
                </div>

                <div className="account-details">
                    <h2>Thông tin tài khoản</h2>
                    <div className="account-table">
                        <div className="account-table_row">
                        </div>
                        <div className="account-table_row">
                            <div className="table_row-header">Số điện thoại:</div>
                            <input className="table_row-infor" name="phone" onChange={handleInputChange}  style={{width:"100%"}}/>       
                        </div>
                        <div className="account-table_row">
                            <div className="table_row-header">Địa chỉ:</div>
                            <input className="table_row-infor" name="address" onChange={handleInputChange} style={{width:"100%"}} />    
                        </div> 
                        <div className="account-table_row">
                            <div className="table_row-header">Mật khẩu:</div>
                           < input className="table_row-infor" type="password" name="password" onChange={handleInputChange} style={{width:"100%"}}/> 
                        </div> 
                        <div className="account-table_row">
                            <div className="table_row-header">Xác nhận mật khẩu:</div>
                           < input className="table_row-infor" name="confirmPassword" type="password"  onChange={handleInputChange} style={{width:"100%"}}/> 
                        </div>
                   
                    </div>
                </div>
                <button type="submit" >Thêm</button >
            </form>
        </div>
    );
}

export default UserPage;
