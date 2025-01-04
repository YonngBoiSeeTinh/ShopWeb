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

const AdminDashboard = () => {
  const query = useQuery({ queryKey: ['order'], queryFn: fetchApi });
  const listOrder = query.data || [];
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // 0 - 11
  const currentYear = currentDate.getFullYear();
  // Hàm để đếm số lượng đơn hàng theo tháng
  const getOrderCountByMonth = (orders) => {
    const countByMonth = {};
    // Lặp qua danh sách đơn hàng
    orders.forEach((order) => {
      const orderDate = new Date(order.createdAt);
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
  const chartDataOrder = Object.entries(orderCounts).map(([month, count]) => ({
    month,
    count,
  }));

   // Hàm lấy số lượng order trong tháng
  const getOrderCount = (orders) => {
    const count = {
        currentMonth: 0,
        previousMonth: 0,
    };
    orders.forEach(order => {
        const createdAt = new Date(order.createdAt); // Giả sử `createdAt` là thuộc tính chứa ngày tạo tài khoản
        const month = createdAt.getMonth();
        const year = createdAt.getFullYear();
        if (year === currentYear) {
            if (month === currentMonth) {
                count.currentMonth += 1; // Tăng số lượng cho tháng hiện tại
            } else if (month === currentMonth - 1) {
                count.previousMonth += 1; // Tăng số lượng cho tháng trước
            }
        }
        else if (year === currentYear - 1 && currentMonth === 0 && month === 11) {
          // Xử lý trường hợp khi tháng hiện tại là tháng 1 (currentMonth === 0), cần so sánh với tháng 12 của năm trước
          count.previousMonth += 1;
      }
    });
    return count;
  };

const orderCountMonth = getOrderCount(listOrder)
let compareOrder = 0;
let classNameForCompareOrder = 'neutral';
if (orderCountMonth.previousMonth > 0) {
  compareOrder = ((orderCountMonth.currentMonth - orderCountMonth.previousMonth) / orderCountMonth.previousMonth) * 100;
  classNameForCompareOrder = compareOrder > 0 ? 'increase' : 'decrease';
}
// Lấy doanh thu tháng
const getRevenue = (revenues) => {
  const count = {
      currentMonth: 0,
      previousMonth: 0,
  };
  revenues.forEach(revenue => {
      const createdAt = new Date(revenue.createdAt); // Giả sử `createdAt` là thuộc tính chứa ngày tạo tài khoản
      const month = createdAt.getMonth();
      const year = createdAt.getFullYear();
      if (year === currentYear) {
          if (month === currentMonth && revenue.isPaid) {
              count.currentMonth += revenue.totalPrice; // Tăng số lượng cho tháng hiện tại
          } else if (month === currentMonth - 1 && revenue.isPaid) {
              count.previousMonth += revenue.totalPrice; // Tăng số lượng cho tháng trước
          }
      }
      else if (year === currentYear - 1 && currentMonth === 0 && month === 11) {
        // Xử lý trường hợp khi tháng hiện tại là tháng 1 (currentMonth === 0), cần so sánh với tháng 12 của năm trước
        count.previousMonth += 1;
    }
  });
  return count;
};

const revenueMonth = getRevenue(listOrder)
let compareRevenue = 0;
let classNameForCompareRevenue = 'neutral';
if (revenueMonth.previousMonth > 0) {
  compareRevenue = ((revenueMonth.currentMonth - revenueMonth.previousMonth) / revenueMonth.previousMonth) * 100;
  classNameForCompareRevenue = compareRevenue > 0 ? 'increase' : 'decrease';
}

// Hàm để lấy doanh thu theo tháng
const getRevenueByMonth = (revenues) => {
    const countByMonth = {};
    // Khởi tạo các tháng trong 6 tháng qua với giá trị 0
    for (let i = 0; i < 6; i++) {
      const date = new Date(currentYear, currentMonth - i, 1); // Tạo ngày cho từng tháng
      const month = date.getMonth();
      const year = date.getFullYear();
      const monthKey = `${year}-${month + 1}`; // Định dạng "YYYY-MM"
      countByMonth[monthKey] = 0;
    }
    // Lặp qua danh sách đơn hàng
    revenues.forEach((revenue) => {
      const orderDate = new Date(revenue.createdAt);
      const month = orderDate.getMonth();
      const year = orderDate.getFullYear();

      // Kiểm tra xem đơn hàng có trong 6 tháng qua không
      if (year === currentYear && month >= currentMonth - 5 && month <= currentMonth && revenue.isPaid) {
        const monthKey = `${year}-${month + 1}`; // Định dạng "YYYY-MM"
        countByMonth[monthKey] = (countByMonth[monthKey] || 0) + revenue.totalPrice; // Tăng số lượng cho tháng tương ứng
      }
    });

    return countByMonth;
  };
  const revenueBymonth = getRevenueByMonth(listOrder);
  // Chuyển đổi dữ liệu để sử dụng trong biểu đồ
  const chartDataVenue = Object.entries(revenueBymonth).map(([month, venue]) => ({
    month,
    venue,
  }));


  // lấy số lượng user
  const queryUser = useQuery({ queryKey: ['user'], queryFn: fetchApiUser });
  const userList = queryUser.data || [];
  console.log('userList',userList);
  const customerList = userList.filter ((item)=>((item.role!="employee") && !item.isAdmin))

  const getUserCountByMonth = (customers) => {
    const count = {
        currentMonth: 0,
        previousMonth: 0,
    };

    customers.forEach(customer => {
        const createdAt = new Date(customer.createdAt); // Giả sử `createdAt` là thuộc tính chứa ngày tạo tài khoản
        const month = createdAt.getMonth();
        const year = createdAt.getFullYear();

        if (year === currentYear) {
            if (month === currentMonth) {
                count.currentMonth += 1; // Tăng số lượng cho tháng hiện tại
            } else if (month === currentMonth - 1) {
                count.previousMonth += 1; // Tăng số lượng cho tháng trước
            }
        }
        else if (year === currentYear - 1 && currentMonth === 0 && month === 11) {
          // Xử lý trường hợp khi tháng hiện tại là tháng 1 (currentMonth === 0), cần so sánh với tháng 12 của năm trước
          count.previousMonth += 1;
      }
    });

    return count;
};

const customerCounts = getUserCountByMonth(customerList)
let compareUser = 0;
let classNameForCompare = 'neutral';
if (customerCounts.previousMonth > 0) {
  compareUser = ((customerCounts.currentMonth - customerCounts.previousMonth) / customerCounts.previousMonth) * 100;
  classNameForCompare = compareUser > 0 ? 'increase' : 'decrease';
}


  return (
    <div className="dashboard">
      <div className='card-top'>
         <div className='card-top_item'>
            <h4 className='title'>KHÁCH HÀNG</h4>
            <span className={classNameForCompare}>{compareUser}%</span>
            <div className='amount'>{customerCounts.currentMonth}</div>
            <Link className='link'>Xem chi tiết</Link>
            <span className='icon'>icon</span>
         </div>
         <div className='card-top_item'>
              <h4 className='title'>ĐƠN HÀNG</h4>
              <span className={classNameForCompareOrder}>{compareOrder}%</span>
              <div className='amount'>{orderCountMonth.currentMonth}</div>
              <Link className='link'>Xem chi tiết</Link>
              <span className='icon'>icon</span>
         </div>
         <div className='card-top_item'>
           <h4 className='title'>DOANH THU NGÀY</h4>
            <span className=' decrease'>30%</span>
            <div className='amount'>500</div>
            <Link className='link'>Xem chi tiết</Link>
            <span className='icon'>icon</span>
         </div>
         <div className='card-top_item'>
            <h4 className='title'>DOANH THU THÁNG</h4>
            <span className={classNameForCompareRevenue} >{compareRevenue}%</span>
            <div className='revenue' >{revenueMonth.currentMonth} VND</div>
            <Link className='link'>Xem chi tiết</Link>
            <span className='icon'>icon</span>
         </div>
      </div>
      <div className='total_by_month'>
        <div className='compareMonth'>
          <h4>SO SÁNH DOANH THU : </h4>
        </div>
        <div className='total_month-chart'>
          <h4>DOANH THU 6 THÁNG QUA: </h4>
          <BarChart width={680} height={350} data={chartDataVenue} className='vunue_chart'>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tick={{ fontSize: 12, dx: -5 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="venue" fill="#82ca9d" className='chart_bar' />
        </BarChart>
        </div>
      </div>
      <div className='order_by_month'>
        <h4>ĐƠN HÀNG 6 THÁNG QUA: </h4>
      </div>

     
    </div>
  );
};

export default AdminDashboard;
