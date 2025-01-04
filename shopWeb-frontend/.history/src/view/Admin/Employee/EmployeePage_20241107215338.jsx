import React, { useState,useContext  } from 'react';
import axios from 'axios';
import { useQuery  } from '@tanstack/react-query';
import EmployeeItem from './EmployeeItem';
import './Employee.scss';
import Pagination from '../../Pagination'
import { FilterContext } from '../AdminLayout';
import { Link } from 'react-router-dom';


const CustomerManagement = ({setAlertMessage,setShowAlert, setType,user}) => {
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
  
  const handleDelete = async (id) => {
    console.log('Xóa nhân viên có ID:', id);
    console.log('Admin ID:', user.id);
    console.log(user.access_token);
    try {
      const res = await axios.delete(`http://localhost:3001/api/user/delete/${id}`, {
        headers: {
            token: `Bearer ${user.access_token}`
        }
    });
      
      // Kiểm tra nếu response thành công
      if (res.status === 200) {
        setAlertMessage("Khách hàng đã được xóa thành công!");
        query.refetch();  // Lấy lại dữ liệu
        setType("success");
        setShowAlert(true);
      }
  
    } catch (error) {
      console.error('Lỗi khi xóa Khách hàng:', error);
      if (error.response) {
        alert(`Có lỗi xảy ra: ${error.response.data.message}`);
      } else {
        alert('Có lỗi xảy ra khi xóa Khách hàng. Vui lòng thử lại!');
      }
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
