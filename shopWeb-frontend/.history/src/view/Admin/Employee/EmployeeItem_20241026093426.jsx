import React, { useEffect, useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import './Employee.scss'

const CustomerManagement = ({employee}) => {
  const navigate = useNavigate();
  const handelClickEmployee=()=>{
    
  }
  return (          
        <div className="customer_title customer_item">
            <div className="num">1</div>
            <div className="name"> <img src={employee.avatar}/> {employee.name} </div>
            <div className="email">{employee.email}</div>  
            <div className="phone">{employee.phone}</div>
            <div className="address">{employee.address}</div>
            <div className="action"><Link to={'/employeeDetail'}  state={user=employee}>Xem Chi tiết</Link> <button>X</button></div>
        </div> 
  );
};



const handleDelete = (id) => {
  console.log('Xóa khách hàng có ID:', id);
};

export default CustomerManagement;
