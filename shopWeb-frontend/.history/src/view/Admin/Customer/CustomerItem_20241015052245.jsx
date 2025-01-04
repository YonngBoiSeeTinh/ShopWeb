import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Customer.scss'

const CustomerManagement = ({customer}) => {
  const navigate = useNavigate();
  const handelClickCustomer=()=>{
    
  }
  return (
    <div className='customer-item'>              
                <div>{customer.name}</div>
                <div>{customer.email}</div>
                <div>{customer.phone}</div>
                <button onClick={() => handleDelete(customer.id)}>Xóa</button>
                     
    </div>
  );
};



const handleDelete = (id) => {
  console.log('Xóa khách hàng có ID:', id);
};

export default CustomerManagement;
