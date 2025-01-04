import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import './dashboard.css';

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

    // Lấy ngày hiện tại
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // 0 - 11
    const currentYear = currentDate.getFullYear();

    // Lặp qua danh sách đơn hàng
    orders.forEach(order => {
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

  return (
    <div className="dashboard">
      <h2>Order Counts by Month</h2>
      <ul>
        {Object.entries(orderCounts).map(([month, count]) => (
          <li key={month}>
            Month: {month} - Count: {count}
          </li>
        ))}
      </ul>
      <div className='chart1'></div>
    </div>
  );
};

export default AdminDashboard;
