import React, { useState,useEffect } from "react";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import Order from './Order';
import OrderAccpet from './OrderAccept';
import OrderPaid from './OrderPaid';

import OrderNav from './OrderNav'

import './OrderPage.css';

const OrderPage = () => {
  const fetchApi = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/order/get`);
      return res.data.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  const query = useQuery({ queryKey: ['orders'], queryFn: fetchApi });
 // State để lưu trữ các đơn hàng đã xác nhận và chưa xác nhận
  const [acceptOrder, setAcceptOrder] = useState([]);
  const [nonAcceptOrder, setNonAcceptOrder] = useState([]);
  const [paidOrder, setPaidOrder] = useState([]);

  const queryData = query.data || [];

  // Sử dụng useEffect để cập nhật danh sách khi queryData thay đổi
  useEffect(() => {
    setAcceptOrder(queryData.filter(order => order.accept && !order.isPaid));
    setNonAcceptOrder(queryData.filter(order => !order.accept));
    setPaidOrder(queryData.filter(order => order.isPaid));
    query.refetch()
  }, [queryData]);  // Theo dõi queryData

  
  return (
    <div >
       <Sidebar /> {/* Hiển thị Sidebar */}
            <main className="main-content">
              <Navbar  />
              <Outlet  /> 
            </main>
    
    </div>
  );
};

export default OrderPage;
