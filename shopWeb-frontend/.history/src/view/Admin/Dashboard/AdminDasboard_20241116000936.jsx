import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import {
  ResponsiveContainer,
  LineChart,
  BarChart,
  Bar ,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { Link } from 'react-router-dom';
import './dashboard.scss';
import Usercount from  './UserCount'
import OrderCount from './OrderCount'
import RevenueCount from './RevenueCount';
import CompanyChart from './CompanyChart';
import RevenueChart from './RevenueChart'
import OrderChart from  './OrderChart'

const fetchApi = async () => {
  try {
    const res = await axios.get(`http://localhost:3001/api/order/get`);
    console.log('API Response:', res.data); // Kiểm tra dữ liệu trả về
    return res.data.data; // Đảm bảo đây là một mảng
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
const fetchApiUser = async () => {
  try {
    const res = await axios.get(`http://localhost:3001/api/user/get`);
    console.log('API Response:', res.data); // Kiểm tra dữ liệu trả về
    return res.data.data; // Đảm bảo đây là một mảng
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
const fetchApiProduct = async () => {
  try {
    const res = await axios.get(`http://localhost:3001/api/product/get`);
    console.log('API Response:', res.data); // Kiểm tra dữ liệu trả về
    return res.data.data; // Đảm bảo đây là một mảng
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const AdminDashboard = () => {
  const query = useQuery({ queryKey: ['order'], queryFn: fetchApi });
  const listOrder = query.data || [];

  // lấy số lượng user
  const queryUser = useQuery({ queryKey: ['user'], queryFn: fetchApiUser });
  const userList = queryUser.data || [];

  // lấy số lượng product
  const queryProduct= useQuery({ queryKey: ['products'], queryFn: fetchApiProduct });
  const productList = queryProduct.data || [];


  return (
    <div className="dashboard">
      <div className='card-top'>
         <Usercount userList={userList}/>
         <OrderCount OrderList={listOrder}/>
         <RevenueCount OrderList={listOrder} />
         <RevenueCount OrderList={listOrder} />
      </div>
      
      <div className='total_by_month'>
        <div className='compareMonth'>
          <h4>SẢN PHẨM BÁN CHẠY : </h4>
          <CompanyChart  products={productList}/>
        </div>
        <div className='total_month-chart'>
          <h3>DOANH THU 6 THÁNG QUA: </h3>
          <RevenueChart OrderList={listOrder} />
        </div>
      </div>
     
      <div className='order_by_month'>
        <h3>ĐƠN HÀNG 6 THÁNG QUA: </h3>
        <OrderChart Orders={listOrder} />
      </div>

     
    </div>
  );
  
};

export default AdminDashboard;
