import React, { useState,useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Order from '../Order/Order'
import { useLocation } from "react-router-dom";

function UserPage({ setAlertMessage,setShowAlert, setType }) {
    const location = useLocation()
    const user = location.state?.user;
    console.log('employee', user);
    const [phone, setPhone] = useState(user?.phone);
    const [address, setAddress] = useState(user?.address);
    const [avatar, setAvatar] = useState("");
    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);

    const handleSavePhone = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/api/user/update/${user._id}`, { phone });
           
            if (response.data.status === 'OK') {
                setAlertMessage("Cập nhật số điện thoại thành công ");
                setType("success");
                setShowAlert(true);
            } else {
                console.log(response.data); // Hiển thị thông báo lỗi
            }
        } catch (error) {
            console.error('Error updating name:', error);
            alert(error.response.data.message); 
        }
        setIsEditingPhone(false);
    };
    const handleSaveAddress = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/api/user/update/${user._id}`, { address });
            console.log(user._id);
            console.log(response);
            if (response.data.status === 'OK') {
                setAlertMessage("Cập nhật  địa chỉ thành công");
                setType("success");
                setShowAlert(true);
            } else {
               
            }
        } catch (error) {
            console.error('Error updating name:', error);
            alert(error.response.data.message); 
        }
        setIsEditingAddress(false);
    };
    const handleSaveName = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/api/user/update/${user._id}`, { name });
            if (response.data.status === 'OK') {
                setAlertMessage("Cập nhật tên thành công");
                setType("success");
                setShowAlert(true);
            } else {
                alert(response.data.message); // Hiển thị thông báo lỗi
            }
        } catch (error) {
            console.error('Error updating name:', error);
            alert(error.response.data.message); 
        }
        setIsEditingName(false);
    };
    const handleSaveEmail = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/api/user/update/${user._id}`, { email });
            if (response.data.status === 'OK') {
                setAlertMessage("Cập email  thành công");
                setType("success");
                setShowAlert(true);
            } else {
                alert(response.data.message); // Hiển thị thông báo lỗi
            }
        } catch (error) {
        setAlertMessage(error.response.data.message);
            setType("danger");
            setShowAlert(true);
        }
        setIsEditingEmail(false);
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

    return (
        <div style={{height:"100vh", marginTop:"130px " }}>
            <div className="user-page">
                <div className="user-profile">
                    <input type="file" id="fileInput" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                    <div className="avatar-section" onClick={() => document.getElementById('fileInput').click()}>
                        <img src={user?.avatar ? user.avatar : (avatar?avatar:"https://cdn-icons-png.flaticon.com/512/4211/4211763.png")} alt="avatar" className="user-avatar" />
                    </div>
                    <div className="user-info">
                        <div style={{ display: 'flex' }}>
                            Tên
                            <input className="table_row-infor" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div style={{ display: 'flex' }}>
                            Email
                            <input className="table_row-infor" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="user-action">
                            Mật khẩu
                        <input className="table_row-infor" value={password} onChange={(e) => setEmail(e.target.value)} />
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
                            <input className="table_row-infor" value={phone} onChange={(e) => setPhone(e.target.value)} />       
                        </div>
                        <div className="account-table_row">
                            <div className="table_row-header">Địa chỉ:</div>
                            <input className="table_row-infor" value={address} onChange={(e) => setAddress(e.target.value)} />    
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserPage;
