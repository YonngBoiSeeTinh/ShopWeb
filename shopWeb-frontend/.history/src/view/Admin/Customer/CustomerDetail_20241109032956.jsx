import React, { useState,useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from "react-router-dom";

function UserPage({ setAlertMessage,setShowAlert, setType }) {
    const location = useLocation()
    const user = location.state?.user;
    const fetchApi = async () => {
        try {
          const res = await axios.get(`http://localhost:3001/api/order/getByUserId/${user._id}`);
          return res.data.data;  
        } catch (error) {
          console.error('Error fetching data:', error);
          throw error;
        }
      };
    
    const query =  useQuery({ queryKey: ['orders'], queryFn: fetchApi });
    const queryData = query.data || []; 
    return (
        <div style={{height:"100vh", marginTop:"130px " }}>
            <div className="user-page">
                <div className="user-profile">
                    <div className="avatar-section" >
                        <img src={user?.avatar ? user.avatar : "https://cdn-icons-png.flaticon.com/512/4211/4211763.png"} alt="avatar" className="user-avatar" />
                    </div>
                    <div className="user-info">
                        <div style={{ display: 'flex' }}>
                                <>
                                    <h1 className="user-name">{user?.name || ""}</h1>
                                </>
                        </div>
                        <div style={{ display: 'flex' }}>
                                <>
                                    <p className="user-email">{user?.email || ""}</p>
                                </> 
                        </div>
                    </div>
                </div>

                <div className="account-details">
                    <h2>Thông tin tài khoản</h2>
                    <div className="account-table">
                        <div className="account-table_row">
                            <div className="table_row-header">Ngày tạo tài khoản:</div>
                            <div className="table_row-infor">
                                {new Date(user.createdAt).toLocaleDateString('vi-VN', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                            })}</div>
                        </div>
                        <div className="account-table_row">
                            <div className="table_row-header">Số điện thoại:</div>
                                <>
                                    <div className="table_row-infor">{user?.phone || ""}</div>
                                    <FontAwesomeIcon icon={faPenToSquare} className="iconEditUser" />
                                </>
                        </div>
                        <div className="account-table_row">
                                <>
                                    <div className="table_row-infor">{user?.address || ""}</div>
                                    <FontAwesomeIcon icon={faPenToSquare} className="iconEditUser" />
                                </>
                          
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserPage;
