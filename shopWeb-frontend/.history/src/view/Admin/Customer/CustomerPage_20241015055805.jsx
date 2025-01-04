import React, { useEffect, useState,useContext  } from 'react';
import axios from 'axios';
import { useQuery,useQueryClient  } from '@tanstack/react-query';
import CustomerItem from './CustomerItem';
import './Customer.scss';
import Pagination from '../../Pagination'
import { FilterContext } from '../AdminLayout';

const CustomerManagement = ({}) => {
  const { filter } = useContext(FilterContext);
  console.log(filter);
  const [totalPage,setTotalPage] = useState(0);
  const [currentPage,setCurrentPage] = useState(0); 
  const fetchApi = async () => {
    try {
        const res = await axios.get(`http://localhost:3001/api/user/get?page=${currentPage}`);
        
        setTotalPage(res.data.totalPage*10)
        console.log('Total page:',totalPage); 
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
    
      <div className='customer-list'>
      <h1>Quản lý khách hàng</h1>
        {listCustomer.map((customer, index)=>(
            <CustomerItem customer={customer} key = {index}/>
        ))}
        <Pagination totalPage={totalPage} currentPage={currentPage} setCurrentPage={setCurrentPage} ></Pagination>
      </div>
   
    
          
    </div>
  );
};



const handleDelete = (id) => {
  console.log('Xóa khách hàng có ID:', id);
};

export default CustomerManagement;
