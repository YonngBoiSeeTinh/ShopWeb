import React from "react";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Order from './Order'
import './OrderPage.css'

 
function OrderPage() {
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
       {queryData.map((Order,index)=>{
            <Order Order={Order}/>
       })}
       </div>
    );
}

export default OrderPage;
