import React, { useState,useContext  } from 'react';
import axios from 'axios';
import { useQuery  } from '@tanstack/react-query';
import EmployeeItem from './EmployeeItem';
import './Employee.scss';
import Pagination from '../../Pagination'
import { FilterContext } from '../AdminLayout';
import { Link } from 'react-router-dom';


const CustomerManagement = ({setAlertMessage,setShowAlert, setType}) => {
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
  const listCustomer = querydata.filter((item)=> item.role ==="employee")

  const itemsPerPage = 7; // Số lượng sản phẩm mỗi trang
  const totalPage = Math.ceil(listCustomer.length / itemsPerPage); 
  
  const listFilter = filter ?listCustomer.filter((item) => item.name.toLowerCase().includes(filter.toLowerCase()))
                            :listCustomer
  
  const startIndex = currentPage * itemsPerPage;
  const currentCus = listFilter.slice(startIndex, startIndex + itemsPerPage);
  
  const handleDelete =async (id) => {
    console.log('Xóa khách hàng có ID:', id);
    try {
      const res = await axios.delete(`http://localhost:3001/api/user/delete/${id}`);
      if (res.status === 200) {
        setAlertMessage("Nhân viên đã được xóa thành công!");
        query.refetch()
        setType("success");
        setShowAlert(true);
       
      }
    } catch (error) {
      console.error('Lỗi khi xóa đơn hàng:', error);
      alert('Có lỗi xảy ra khi xóa đơn hàng. Vui lòng thử lại!');
    }
  };
  return (
    <div className='employeePage-container'>
      <h3>NHÂN VIÊN</h3>
      <div className='employee-list'>
        <div>
        <div className="employee_title">
            <div className="num">#</div>
            <div className="name"> Nhân viên</div>
            <div className="email">Email</div>  
            <div className="phone">Số điện thoại</div>
            <div className="address">Địa chỉ</div>
            <div className="action">Chi tiết</div>
        </div> 
        </div>
        {currentCus.map((customer, index)=>(
            <EmployeeItem employee={customer} key = {index} index ={index} handleDelete={handleDelete}/>
        ))} 
         <Link to="/admin/addEmployee">
          <div className='btnAdd'>
            Thêm nhân viên
          </div>
      </Link>
      </div>    
      <Pagination totalPage={totalPage*10} currentPage={currentPage} setCurrentPage={setCurrentPage} ></Pagination>   
    </div>
  );
};


export default CustomerManagement;
