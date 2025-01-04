import React, { useState,useEffect } from "react";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';

import OrderNav from './OrderNav'

import './OrderPage.scss';

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
  const listOrder = query.data

  const queryData = query.data || [];
  console.log(queryData);

  
  return (
    <div className="order_page">
      <OrderNav listOrder={listOrder} />
      <main className="main">  
        <div className="order_title">
            <div className="num">#</div>
            <div className="name">
             Tên
            </div>
            <div className="addres">Địa chỉ</div>  
            <div className="date">Ngày</div>
            <div className="status">Trạng thái</div>
            <div className="action">Chi tiết</div>
        </div> 
        <Outlet  /> 
      </main>  
    </div>
  );
};

export default OrderPage;
