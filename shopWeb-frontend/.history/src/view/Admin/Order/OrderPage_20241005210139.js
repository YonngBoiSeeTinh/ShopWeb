import React from "react";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Order from './Order'
import './OrderPage.css'

 
const  OrderPage  = () => {
    const fetchApi = async () => {
        try {
          const res = await axios.get(`http://localhost:3001/api/order/get`);
          return res.data.data;  
        } catch (error) {
          console.error('Error fetching data:', error);
          throw error;
        }
      };
    
      const query =  useQuery({ queryKey: ['orders'], queryFn: fetchApi });
      
      const queryData = query.data || [];
    return (
       <div>
       {queryData.map((order,index)=>{
            <Order order={Ordorderer}/>
       })}
       </div>
    );
}

export default OrderPage;
