import React, { useEffect, useState,useContext  } from 'react';
import axios from 'axios';
import { useQuery,useQueryClient  } from '@tanstack/react-query';
import CustomerItem from './CustomerItem';
import './Customer.css';
import { FilterContext } from '../AdminLayout';

const CustomerManagement = ({}) => {
  const { filter } = useContext(FilterContext);
  console.log(filter);
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


  return (
    <div className='customerPage-container'>
      <h1>Quản lý khách hàng</h1>
      <input
        type="text"
        placeholder="Tìm kiếm khách hàng..."
        className='customer-search'
      />
      <div className='customer-list'>
        {listCustomer.map((customer, index)=>(
            <CustomerItem customer={customer}/>
        ))}
      </div>
   
    
          
    </div>
  );
};



const handleDelete = (id) => {
  console.log('Xóa khách hàng có ID:', id);
};

export default CustomerManagement;
