import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery,useQueryClient  } from '@tanstack/react-query';
import EmployeeItem from './EmployeeItem';


const CustomerManagement = () => {
  const fetchApi = async () => {
    try {
        const res = await axios.get(`http://localhost:3001/api/user/get`);
        console.log('API Response:', res.data); // Kiểm tra dữ liệu trả về
        return res.data.data; // Đảm bảo đây là một mảng
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

const query = useQuery({ queryKey: ['products'], queryFn: fetchApi });

const listCustomer = query.data || [];

const listEmployee = listCustomer.filter((item) => item.role === "employee") || [];


  return (
    <div className='customerPage-container'>
      <h1>Quản lý nhân viên</h1>
     
      <div className='customer-list'>
        {listEmployee.map((customer, index)=>(
            <EmployeeItem customer={customer} key={index}/>
        ))}
      </div>
   
    
          
    </div>
  );
};



const handleDelete = (id) => {
  console.log('Xóa khách hàng có ID:', id);
};

export default CustomerManagement;
