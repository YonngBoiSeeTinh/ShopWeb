import React, { useState, useEffect } from "react";
import './cartNum.css';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const CartNum = ({ userId }) => {
  const fetchApi = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/cart/getByUserId/${userId}`);
      return res.data.data;  
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  const query = useQuery({ queryKey: ['carts'], queryFn: fetchApi });
  const listCart = query.data || [];
  const [cartNumber, setCartNumber] = useState(0);

  // Cập nhật cartNumber khi listCart thay đổi
  useEffect(() => {
    setCartNumber(listCart.length);
    console.log(cartNumber);
  }, [listCart]);

  return (
    <div className="cartNum" style={{ display: cartNumber > 0 ? "flex" : "none" }}>
      {cartNumber}
    </div>
  );
};

export default CartNum;
