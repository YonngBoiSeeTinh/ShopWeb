import React, { useState, useEffect } from "react";
import './Cart.css';
import CartItem from "./CartItem";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import Loading from "../Loading/Loading";

const Cart = ({setAlertMessage,setShowAlert, setType}) => {
  const user = useSelector((state) => state.user);
  const [selectedCart, setSelectedCart] = useState([]); // trạng thái danh sách cart đã chọn
  const [totalPrice, setTotalPrice] = useState(0); // trạng thái tổng tiền

  const userId = user.id;
    const [isAccept,setIsAccept] = useState(false)
    const handleAccept = () => {
      setIsAccept(prevState => !prevState); // Đảo ngược trạng thái
      console.log(!isAccept); // Ghi log trạng thái mới
    };
    // hàm gọi api lấy giỏ hàng theo user
  const fetchApi = async () => { 
      try {
      
        const res = await axios.get(`http://localhost:3001/api/cart/getByUserId/${userId}`);
        return res.data.data;  
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
    
  }
  // dùng hàm gọi api
  const query = useQuery({ queryKey: ['carts'],
                         queryFn: fetchApi, refetchOnMount: true, });
  // danh sách cart từ api
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
  }, [selectedCart]); // chỉ chạy khi selectedCart thay đổi
     
  // Cập nhật giá trị `listCart` khi số lượng sản phẩm thay đổi trong CartItem
    const updateCartList = () => {
      query.refetch();  
    };
    
    const checkStockAndProcessOrder = async () => {
      for (const item of selectedCart) {
        try {
          // Lấy chi tiết sản phẩm từ API
          const response = await axios.get(`http://localhost:3001/api/product/getDetail/${item.productId}`);
          const product = response.data;
    
          // Tìm số lượng tồn kho theo màu
          const colorDetails = product.colors.find((color) => color.color === item.color);
          const countInStock = colorDetails?.countInStock || 0;
    
          console.log('countInStock', countInStock, 'item.amount', item.amount);
    
          // Kiểm tra số lượng tồn kho
          if (item.amount > countInStock) {
            setAlertMessage("Số lượng vượt quá tồn kho, vui lòng giảm");
            setType("warning");
            setShowAlert(true);
            return; // Ngừng kiểm tra khi phát hiện lỗi
          }
        } catch (error) {
          console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
          setAlertMessage("Đã xảy ra lỗi khi kiểm tra tồn kho");
          setType("error");
          setShowAlert(true);
          return; // Dừng kiểm tra khi có lỗi
        }
      }
    
      // Nếu không có lỗi, tiếp tục xử lý đơn hàng
      console.log("Tất cả sản phẩm đều đủ tồn kho, tiếp tục xử lý đơn hàng.");
    };
    // hàm đặt hàng
    const handleOrder = async () => {
      
      if (selectedCart.length === 0) {
        setAlertMessage("Vui lòng chọn sản phẩm để đặt hàng ");
        setType("infor");
        setShowAlert(true);
        return;
      }
      else if(!isAccept){
        setAlertMessage("Vui lòng đồng ý với điều khoản của chúng tôi");
        setType("warning");
        setShowAlert(true);
        return;
      }
    
      const orderProducts = selectedCart.map(item => ({
        name: item.name,              
        totalPrice: item.totalPrice, 
        amount: item.amount,      
        userId,  
        productId:item.productId,                
        color: item.color,      
        isPaid: false,            
        accept: false             
      }));
    
      checkStockAndProcessOrder()
    
    //  try {
    //     // Sử dụng Promise.all để đợi tất cả các đơn hàng được gửi   xử lý bất đông bộ
    //     const responses = await Promise.all(orderProducts.map(async (item) => {
    //       const response = await axios.post('http://localhost:3001/api/order/create', item);  // Gửi từng sản phẩm đặt hàng
    //       return response.data;
    //     }));
    
    //     // Kiểm tra kết quả của tất cả các yêu cầu
    //     if (responses.every(res => res.status === 'OK')) {
    //       setAlertMessage("Đặt hàng thành công, vui lòng đợi xác nhận ");
    //       setType("success");
    //       setShowAlert(true);
    //       console.log(responses);
    //       await Promise.all(selectedCart.map(async (item) => {
    //         await axios.delete(`http://localhost:3001/api/cart/delete/${item._id}`);
    //       }));
    
    //       // Cập nhật lại danh sách giỏ hàng sau khi xóa
    //       setSelectedCart([]);
    //       updateCartList(); // Làm mới lại dữ liệu giỏ hàng nếu cần
    //     } else {
    //       alert('Một số đơn hàng đặt thất bại!');
    //     }
    //   } catch (error) {
    //     console.error('Lỗi khi đặt hàng:', error);
    //     alert('Có lỗi xảy ra khi đặt hàng!');
    //   }
    };
    
    
  // Kiểm tra trạng thái của truy vấn
  if (query.isLoading) {
    return <Loading />;
  }

  if (query.isError) {
    return <div>Error fetching data: {query.error.message}</div>; // Hiển thị lỗi nếu có
  }
 
  return (
    <div className="cart-container">
      <div className="cart-header">
        <a href="#" className="back-link">Về trang chủ </a>
        <a href="#" className="cart-link">Giỏ hàng của bạn</a>
      </div>
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

      <div className="cart-form">
        <div className="customer-info">
         
          <div className="customer-info_item"> <span>Tên:</span>{user.name}</div>
          <div className="customer-info_item"> <span>Số điện thoại:</span>{user.phone}</div>
          <div className="customer-info_item"><span>Địa chỉ:</span>{user.address}</div>
         
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

        <div className="cart-agreement">
          <label>
            <input type="checkbox"onChange={handleAccept}/> Tôi đồng ý với <a href="#">Chính sách xử lý dữ liệu cá nhân</a> của GudPhoneStore
          </label>
        </div>

        <button className="order-button" onClick={()=>handleOrder()}>Đặt hàng</button>
      </div>
    </div>
  );
};

export default Cart;
