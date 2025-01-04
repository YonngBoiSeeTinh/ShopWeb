import React, { useState,useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from "react-router-dom";
import Order from "../../Order/Order";

function UserPage({ setAlertMessage,setShowAlert, setType }) {
    const location = useLocation()
    const user = location.state.user;
   
    
    const fetchApiOrder = async () => {
        try {
          const res = await axios.get(`http://localhost:3001/api/order/getByUserId/${user._id}`);
          console.log(res.data.data);
          return res.data.data;  
        } catch (error) {
          console.error('Error fetching data:', error);
          throw error;
        }
      };
    
    const queryOrder =  useQuery({ queryKey: ['orders'], queryFn: fetchApiOrder });
   
    const { refetch } = queryOrder;
    const queryDataOrder = queryOrder.data || []; 
    const handleDeleteOrder =async(id)=>{
        try {
          const res = await axios.delete(`http://localhost:3001/api/order/delete/${id}`);
          
          if (res.status === 200) {
            setAlertMessage("Đơn hàng đã được xóa thành công!");
            setType("success");
            setShowAlert(true);
            refetch();
          }
        } catch (error) {
          console.error('Lỗi khi xóa đơn hàng:', error);
          alert('Có lỗi xảy ra khi xóa đơn hàng. Vui lòng thử lại!');
        }
      }

    return (
        <div style={{height:"auto", marginTop:"130px ",background:"white" }}>
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
                            <div className="table_row-infor">{user?.phone || ""}</div> 
                        </div>
                        <div className="account-table_row">  
                        <div className="table_row-header">Địa chỉ:</div>
                             <div className="table_row-infor">{user?.address || ""}</div>
                        </div> 
                        <div className="account-table_row">
                            <div className="table_row-header">Số đơn hàng đã thực hiện:</div>
                            <div className="table_row-infor">{queryDataOrder.length}</div>
                        </div>
                       
                    </div>
                    <div className="Order-list" style={{display: user.role=="employee"?"none":"block"}}>
                            <h3>Đơn hàng của bạn:</h3>
                            {queryDataOrder.map((order,index) =>(
                                    <Order order={order} key = {index}  handleDeleteOrder={handleDeleteOrder} 
                                    setAlertMessage={setAlertMessage}
                                    setShowAlert={setShowAlert} setType={setType}/>
                            ))}
                                
                        </div>
                </div>
            </div>
        </div>
    );
}

export default UserPage;
