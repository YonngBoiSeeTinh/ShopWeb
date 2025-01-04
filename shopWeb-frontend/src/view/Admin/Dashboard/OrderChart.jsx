import React from 'react';
import './dashboard.scss';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend,
  } from 'recharts';
const UpploadChart = ({ Orders = [] }) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // 0 - 11
  const currentYear = currentDate.getFullYear();

  // Hàm để lấy doanh thu theo tháng
  const getorderByMonth = (orders) => {
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
        countByMonth[monthKey] += 1; // Tăng luot order cho tháng tương ứng
      }
    });

    return countByMonth;
  };

  const orderByMonth = getorderByMonth(Orders);

  // Chuyển đổi dữ liệu để sử dụng trong biểu đồ
  const chartData = Object.entries(orderByMonth).map(([month, order]) => ({
    month,
    order,
  }));

  return (
    <div >
       <LineChart width={800} height={300} data={chartData} className='chart_order'>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="order" stroke="#8884d8" />
         
        </LineChart>
    </div>
  );
};

export default UpploadChart;
