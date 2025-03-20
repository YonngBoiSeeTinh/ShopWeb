import React, { useState,useEffect } from "react";
import { Outlet } from 'react-router-dom';
import OrderNav from './OrderNav'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import './OrderPage.scss';
import Order from "./OrderList";

const OrderPage = ({setAlertMessage,setShowAlert, setType}) => {
  const fetchApi = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/order/get?sort=createdAt&sort=desc`);
      return res.data.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  const query = useQuery({ queryKey: ['orders'], queryFn: fetchApi });
  const { refetch } = query;
  const [listOrder,setListOrder] = useState([])
  const orderList = query.data || [];
  const [currentTab, setCurrentTab] = useState('nonAccept');
  useEffect(() => {
    if (orderList.length > 0) {
      switch (currentTab) {
        case 'nonAccept': 
          setListOrder(orderList.filter((item) => !item.accept));
          break;
        case 'accept': 
          setListOrder(orderList.filter((item) => item.accept && !item.isPaid));
          break;
        case 'paid': 
          setListOrder(orderList.filter((item) => item.accept && item.isPaid));
          break;
        default:
          setListOrder(orderList);
          break;
      }
    }
  }, [orderList, currentTab]); 
  
  
  
  return (
    <div className="order_page">
      <OrderNav handleSeeNonAccept={() => setCurrentTab('nonAccept')} 
                handleSeeAccept={() => setCurrentTab('accept')} 
                handleSeePaided={() => setCurrentTab('paid')}  />
      <div className="main">  
        <div className="order_title">
            <div className="num">#</div>
            <div className="name">
             Tên
            </div>
            <div className="addres">Sản phẩm</div>  
            <div className="date">Ngày</div>
            <div className="status">Trạng thái</div>
            <div className="action">Chi tiết</div>
        </div> 
        <Order listOrder ={listOrder} refetch={refetch} setAlertMessage={setAlertMessage}
         setShowAlert={setShowAlert} setType={setType} setListOrder={setListOrder} />
      </div>  
    </div>
  );
};

export default OrderPage;
