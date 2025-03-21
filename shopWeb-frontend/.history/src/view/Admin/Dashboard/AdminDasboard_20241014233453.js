import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { Link } from 'react-router-dom';
import './dashboard.scss';

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

const AdminDashboard = () => {
  const query = useQuery({ queryKey: ['order'], queryFn: fetchApi });
  const listOrder = query.data || [];

  // Hàm để đếm số lượng đơn hàng theo tháng
  const getOrderCountByMonth = (orders) => {
    const countByMonth = {};
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // 0 - 11
    const currentYear = currentDate.getFullYear();

    // Lặp qua danh sách đơn hàng
    orders.forEach((order) => {
      const orderDate = new Date(order.createdAt); // Giả sử `createdAt` là thuộc tính chứa ngày tạo đơn hàng
      const month = orderDate.getMonth();
      const year = orderDate.getFullYear();

      // Kiểm tra xem đơn hàng có trong 6 tháng qua không
      if (year === currentYear && month >= currentMonth - 5 && month <= currentMonth) {
        const monthKey = `${year}-${month + 1}`; // Định dạng "YYYY-MM"
        countByMonth[monthKey] = (countByMonth[monthKey] || 0) + 1; // Tăng số lượng cho tháng tương ứng
      }
    });

    return countByMonth;
  };

  const orderCounts = getOrderCountByMonth(listOrder);
  
  // Chuyển đổi dữ liệu để sử dụng trong biểu đồ
  const chartData = Object.entries(orderCounts).map(([month, count]) => ({
    month,
    count,
  }));

  return (
    <div className="dashboard">
      <div className='card-top'>
         <div className='card-top_item'>
            <h4 className='title'>KHÁCH HÀNG</h4>
            <span className='increase'>^30%</span>
            <div className='amount'>500</div>
            <Link className='link'>Xem chi tiết</Link>
            <span className='icon'>icon</span>
         </div>
         <div className='card-top_item'>
            <h4>KHÁCH HÀNG</h4>
         </div>
         <div className='card-top_item'>
            <h4>KHÁCH HÀNG</h4>
         </div>
         <div className='card-top_item'>
            <h4>KHÁCH HÀNG</h4>
         </div>
      </div>
      <div className='order_by_month'>
        
      </div>

     
    </div>
  );
};

export default AdminDashboard;
