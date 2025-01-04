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
  const [currentPage,setCurrentPage] = useState(0); 
  const fetchApi = async () => {
    try {
        const res = await axios.get(`http://localhost:3001/api/user/get`);     
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
  const querydata = query.data || [];
  const listCustomer = querydata.filter((item)=> !item.isAdmin &&  (item.role !="employee"))
  
  const listFilter = filter ?listCustomer.filter((item) => item.name.toLowerCase().includes(filter.toLowerCase()))
  :listCustomer

  const itemsPerPage = 7; // Số lượng sản phẩm mỗi trang
  const totalPage = Math.ceil(listCustomer.length / itemsPerPage); 

  const startIndex = currentPage * itemsPerPage;
  const currentCus = listFilter.slice(startIndex, startIndex + itemsPerPage);
  
const handleDelete = (id) => {
  console.log('Xóa khách hàng có ID:', id);
};
  return (
    <div className='customerPage-container'>
      <h3>KHÁCH HÀNG</h3>
      <div className='customer-list'>
        <div>
        <div className="customer_title">
            <div className="num">#</div>
            <div className="name"> Khách hàng </div>
            <div className="email">Email</div>  
            <div className="phone">Số điện thoại</div>
            <div className="address">Địa chỉ</div>
            <div className="action">Chi tiết</div>
        </div> 
        </div>
        {currentCus.map((customer, index)=>(
            <CustomerItem customer={customer} key = {index}/>
        ))} 
        
      </div>    
      <Pagination totalPage={totalPage*10} currentPage={currentPage} setCurrentPage={setCurrentPage} ></Pagination>   
    </div>
  );
};


export default CustomerManagement;
