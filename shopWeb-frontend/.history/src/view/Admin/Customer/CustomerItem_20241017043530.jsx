import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Customer.scss'

const CustomerManagement = ({customer}) => {
  const navigate = useNavigate();
  const handelClickCustomer=()=>{
    
  }
  return (          
        <div className="customer_title">
            <div className="num">1</div>
            <div className="name"> <img> </img> {customer.name} </div>
            <div className="email">Email</div>  
            <div className="phone">Số điện thoại</div>
            <div className="address">Địa chỉ</div>
            <div className="action">Chi tiết</div>
        </div> 
  );
};



const handleDelete = (id) => {
  console.log('Xóa khách hàng có ID:', id);
};

export default CustomerManagement;
