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
        const res = await axios.get(`http://localhost:3001/api/user/get?page=${currentPage}&limit=7`);     
        setTotalPage(res.data.totalPage*10)
        return res.data.data; // Đảm bảo đây là một mảng
        
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

  const query = useQuery({
    queryKey: ['products', currentPage],
    queryFn: fetchApi,
  });

  const listCustomer = query.data || [];

  return (
    <div className='customerPage-container'>
      <h3>KHÁCH HÀNG</h3>
      <div className='customer-list'>
        <div>
        <div className="customer_title">
            <div className="num">#</div>
            <div className="name"> Tên </div>
            <div className="addres">Địa chỉ</div>  
            <div className="date">Ngày</div>
            <div className="status">Trạng thái</div>
            <div className="action">Chi tiết</div>
        </div> 
        </div>
        {listCustomer.map((customer, index)=>(
            <CustomerItem customer={customer} key = {index}/>
        ))} 
      </div>    
      <Pagination totalPage={totalPage} currentPage={currentPage} setCurrentPage={setCurrentPage} ></Pagination>   
    </div>
  );
};



const handleDelete = (id) => {
  console.log('Xóa khách hàng có ID:', id);
};

export default CustomerManagement;
