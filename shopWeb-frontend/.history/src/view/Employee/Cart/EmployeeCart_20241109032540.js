import React, { useState, useEffect } from "react";
import './Cart.scss';
import CartItem from "../../Cart/CartItem";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import Loading from "../../Loading/Loading";

const Cart = () => {
  const user = useSelector((state) => state.user);
  const [selectedCart, setSelectedCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const userId = user.id;
    const [cusName,setcusName] = useState("");
    const [address,setAddress] = useState("");
    const [phone,setPhone] = useState("");
 
  const fetchApi = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/cart/getByUserId/${userId}`);
      return res.data.data;  
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  const query = useQuery({ queryKey: ['carts'],
                         queryFn: fetchApi, refetchOnMount: true, });
  const listCart = query.data || []; 

  const handleSelectedCart = (cartItem, isChecked) => {
    if (isChecked) {    
      setSelectedCart((prevSelected) => [...prevSelected, cartItem]);
    } else {    
      setSelectedCart((prevSelected) =>
        prevSelected.filter((item) => item._id !== cartItem._id)  
      );    
    }
  };

  useEffect(() => {
    const calculateTotalPrice = (cart) => {
      const total = cart.reduce((sum, item) => sum + item.totalPrice, 0);
      setTotalPrice(total);
    };
    calculateTotalPrice(selectedCart);
  }, [selectedCart]);
    
  // Cập nhật giá trị `listCart` khi số lượng sản phẩm thay đổi trong CartItem
    const updateCartList = (updatedCart) => {
      query.refetch(); // Cập nhật lại dữ liệu giỏ hàng nếu cần thiết
    };
    
    const handleOrder = async () => {
      if (selectedCart.length === 0) {
        alert('Vui lòng chọn sản phẩm để đặt hàng');
        return;
      }
    
      // Tạo một mảng các sản phẩm đặt hàng với các trường cần thiết
      const orderProducts = selectedCart.map(item => ({ 
        totalPrice: item.totalPrice, 
        amount: item.amount,    
        userId,                   
        cusName,  
        productId:item.productId,              
        address,                  
        phone,               
        color: item.color,       
        isPaid: false,           
        accept: true            
      }));
    
      console.log('Dữ liệu đơn hàng:', orderProducts); 
    
      try {
        // Sử dụng Promise.all để đợi tất cả các đơn hàng được gửi
        const responses = await Promise.all(orderProducts.map(async (item) => {
          const response = await axios.post('http://localhost:3001/api/order/create', item);  // Gửi từng sản phẩm đặt hàng
          return response.data;
        }));
    
        // Kiểm tra kết quả của tất cả các yêu cầu
        if (responses.every(res => res.status === 'OK')) {
          alert('Tất cả các đơn hàng đã được đặt thành công!');
          console.log(responses);
          await Promise.all(selectedCart.map(async (item) => {
            await axios.delete(`http://localhost:3001/api/cart/delete/${item._id}`);
          }));
    
          // Cập nhật lại danh sách giỏ hàng sau khi xóa
          setSelectedCart([]);
          updateCartList(); // Làm mới lại dữ liệu giỏ hàng nếu cần
        } else {
          alert('Một số đơn hàng đặt thất bại!');
        }
      } catch (error) {
        console.error('Lỗi khi đặt hàng:', error);
        alert('Có lỗi xảy ra khi đặt hàng!');
      }
    };
    
    
  // Kiểm tra trạng thái của truy vấn
  if (query.isLoading) {
    return <Loading />;
  }

  if (query.isError) {
    return <div>Error fetching data: {query.error.message}</div>; // Hiển thị lỗi nếu có
  }

  return (
    <div className="employee_cart-container">
      <div className="cart-header">
        <h3 className="cart-link">GIỎ HÀNG</h3>
      </div>
      <h4>Sản phẩm</h4>
      <div className="cart_content">
        
      <div className="cart_pro">
        {listCart.map((cart, index) => (
          <CartItem  cart={cart}
          key={index}
          handleSelectedCart={handleSelectedCart}
          selectedCart={selectedCart}
          setSelectedCart={setSelectedCart}
          updateCartList={updateCartList}/>
        ))}
    
        <div className="cart-summary">
          <p>Tạm tính ({selectedCart.length} sản phẩm):</p>
          <p>{totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
      </div>
      </div>
      <div className="cart-form">
        <div className="customer-info">     
          <input type="text" placeholder="Họ và Tên"  onChange={(e) => setcusName(e.target.value)} className="customer-info_item" />
          <input type="text" placeholder="Số điện thoại" onChange={(e) => setPhone(e.target.value)} className="customer-info_item" />
          <input type="text" placeholder="Số nhà, tên đường" onChange={(e) => setAddress(e.target.value)} className="customer-info_item"/>
        </div>

        <div className="delivery-method">
          <h4>Chọn hình thức nhận hàng</h4>
          <label>
            <input type="radio" name="delivery" value="Giao tận nơi" defaultChecked /> Giao tận nơi
          </label>
          <label>
            <input type="radio" name="delivery" value="Nhận tại cửa hàng" /> Nhận tại cửa hàng
          </label>
        </div>
        <div className="total-section">
          <div className="total-price">
            <p>Tổng tiền:</p>
            <p>{totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
          </div>
        </div>
        <button className="order-button" onClick={handleOrder}>Thanh toán</button>
      </div>
      </div>
     
    </div>
  );
};

export default Cart;
