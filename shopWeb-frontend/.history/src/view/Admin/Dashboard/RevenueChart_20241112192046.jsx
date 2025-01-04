import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import './dashboard.scss';

const RevenueChart = ({ OrderList = [] }) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // 0 - 11
  const currentYear = currentDate.getFullYear();

  // Hàm để lấy doanh thu theo tháng
  const getRevenueByMonth = (orders) => {
    const countByMonth = {};

    // Khởi tạo các tháng trong 6 tháng qua với giá trị 0
    for (let i = 0; i < 6; i++) {
      const date = new Date(currentYear, currentMonth - i, 1);
      const month = date.getMonth();
      const year = date.getFullYear();
      const monthKey = `${year}-${month + 1}`; // Định dạng "YYYY-MM"
      countByMonth[monthKey] = 0;
    }

    // Lặp qua danh sách đơn hàng
    orders.forEach((order) => {
      const orderDate = new Date(order.createdAt);
      const month = orderDate.getMonth();
      const year = orderDate.getFullYear();

      // Kiểm tra xem đơn hàng có trong 6 tháng qua không
      if (year === currentYear && month >= currentMonth - 5 && month <= currentMonth ) {
        const monthKey = `${year}-${month + 1}`;
        countByMonth[monthKey] += order.totalPrice; // Tăng doanh thu cho tháng tương ứng
      }
    });

    return countByMonth;
  };

  const revenueByMonth = getRevenueByMonth(OrderList);

  // Chuyển đổi dữ liệu để sử dụng trong biểu đồ
  const chartDataVenue = Object.entries(revenueByMonth).map(([month, Doanh_thu]) => ({
    month,
    Doanh_thu,
  }));

  return (
    <div >
      <BarChart width={660} height={350} data={chartDataVenue} className='vunue_chart'>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis tick={{ fontSize: 12, dx: -3 }} />
        <Tooltip formatter={(value) => value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} />
        <Legend />
        <Bar dataKey="Doanh_thu" fill="#82ca9d" className='chart_bar' barSize={50} />
      </BarChart>
    </div>
  );
};

export default RevenueChart;
