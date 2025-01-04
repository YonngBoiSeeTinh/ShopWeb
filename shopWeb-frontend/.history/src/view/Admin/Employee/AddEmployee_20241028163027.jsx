import React, { useState,useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Order from '../Order/Order'
import { useLocation } from "react-router-dom";

function UserPage({ setAlertMessage,setShowAlert, setType }) {
    
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [avatar, setAvatar] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
   
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
    const handelSubmit =async(e)=>{

    }

    return (
        <div style={{height:"100vh", marginTop:"130px " }}>
            <div className="user-page">
                <div className="user-profile">
                    <input type="file" id="fileInput" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                    <div className="avatar-section" onClick={() => document.getElementById('fileInput').click()}>
                        <img src={(avatar?avatar:"https://cdn-icons-png.flaticon.com/512/4211/4211763.png")} alt="avatar" className="user-avatar" />
                    </div>
                    <div className="user-info">
                        <div style={{ display: 'flex' }}>
                        <div className="table_row-header"  style={{background:"none"}}>Tên:</div>
                            <input className="table_row-infor" value={name} onChange={(e) => setName(e.target.value)}
                            style={{width:"300px"}} />
                        </div>
                        <div style={{ display: 'flex' }}>
                        <div className="table_row-header" style={{background:"none"}}>Email:</div>
                            <input className="table_row-infor" value={email} onChange={(e) => setEmail(e.target.value)} />
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
                            <input className="table_row-infor" value={phone} onChange={(e) => setPhone(e.target.value)}  style={{width:"100%"}}/>       
                        </div>
                        <div className="account-table_row">
                            <div className="table_row-header">Địa chỉ:</div>
                            <input className="table_row-infor" value={address} onChange={(e) => setAddress(e.target.value)} style={{width:"100%"}} />    
                        </div> 
                        <div className="account-table_row">
                            <div className="table_row-header">Mật khẩu:</div>
                           < input className="table_row-infor" value={password} onChange={(e) => setPassword(e.target.value)} style={{width:"100%"}}/> 
                        </div> 
                   
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserPage;
