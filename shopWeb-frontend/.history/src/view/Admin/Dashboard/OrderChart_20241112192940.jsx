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
const UpploadChart = ({ SongList = [] }) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // 0 - 11
  const currentYear = currentDate.getFullYear();

  // Hàm để lấy doanh thu theo tháng
  const getUploadByMonth = (uploads) => {
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
    uploads.forEach((upload) => {
      const uploadDate = new Date(upload.createdAt);
      const month = uploadDate.getMonth();
      const year = uploadDate.getFullYear();

      // Kiểm tra xem đơn hàng có trong 6 tháng qua không
      if (year === currentYear && month >= currentMonth - 5 && month <= currentMonth ) {
        const monthKey = `${year}-${month + 1}`;
        countByMonth[monthKey] += 1; // Tăng luot upload cho tháng tương ứng
      }
    });

    return countByMonth;
  };

  const uploadByMonth = getUploadByMonth(SongList);

  // Chuyển đổi dữ liệu để sử dụng trong biểu đồ
  const chartDataUppload = Object.entries(uploadByMonth).map(([month, upload]) => ({
    month,
    upload,
  }));

  return (
    <div >
       <LineChart width={800} height={300} data={chartDataUppload} className='chart_order'>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="upload" stroke="#8884d8" />
         
        </LineChart>
    </div>
  );
};

export default UpploadChart;
