import React,{useState} from "react";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Pagination from '../../Pagination'
const OrderAccept = ({setAlertMessage,setShowAlert, setType}) => {
  
  const fetchApi = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/order/get?sort=createdAt&sort=desc`);
      return res.data.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  const [currentPage, setCurrentPage] = useState(0);
  const query = useQuery({ queryKey: ['orders'], queryFn: fetchApi });
  const listOrder = query.data || [];
  let listAcceptOrder = listOrder.filter((item)=>item.accept &&!item.isPaid)
  const itemsPerPage = 5; // Số lượng sản phẩm mỗi trang
  const totalPage = Math.ceil(listAcceptOrder.length / itemsPerPage); 

  const startIndex = currentPage * itemsPerPage;
  const currentOders = listAcceptOrder.slice(startIndex, startIndex + itemsPerPage);


  const handleClickAccept = (orderId,order) => {
    handleAcceptOrder(orderId,order);
  };

  const handleAcceptOrder = async (orderId,order) => {
    try {
      console.log('orderId', orderId, order);
      // Đánh dấu đơn hàng đã được thanh toán
      const orderRes = await axios.put(`http://localhost:3001/api/order/update/${orderId}`, {
        isPaid: true
      });
  
      if (orderRes.statusText === "OK") {
        // Lấy sản phẩm dựa trên productId
        const productRes = await axios.get(`http://localhost:3001/api/product/${order.productId}`);
        const product = productRes.data;
  
        // Tìm và cập nhật số lượng của màu cụ thể
        const updatedColors = product.colors.map(color => {
          if (color.color === order.color) {
            return {
              ...color,
              countInstock: color.countInstock - order.amount
            };
          }
          return color;
        });
  
        // Cập nhật sản phẩm với mảng colors đã thay đổi
          try {
            await axios.put(`http://localhost:3001/api/product/update/${order.productId}`, {
              colors: updatedColors
            });
            setAlertMessage("Xác nhận đơn hàng thanh toán thành công");
            setType("success");
            setShowAlert(true);
        }
        catch(error){
          setAlertMessage(error.message || "Lỗi xác nhận đơn hàng");
          setType("danger");
          setShowAlert(true);
        }
     
      }
  
     
  
    } catch (error) {
      setAlertMessage(error.message || "Lỗi xác nhận đơn hàng");
      setType("danger");
      setShowAlert(true);
      throw error;
    }
  };
  
  const fetchApiUser = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/user/get`);
      return res.data.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  const queryUser = useQuery({ queryKey: ['creator'], queryFn: fetchApiUser });
  const listuser = queryUser.data || [];

  const getUser =(userId)=>{
    const user = listuser.filter((item)=>item._id === userId)
    return user[0]
  }

    return (

    <div className="admin_order-item">
      <div style={{height:"490px"}}>
      {currentOders.map((order, index)=>{
        return(
          <div className="order" key ={index}>
           <div className="order_title order_item">
                 <div className="num">{index+1}</div>
                 
                 <div className="name">
                  <img src={getUser(order.userId)?.avatar || ""}/> {getUser(order.userId)?.name}
                 </div>
                 <div className="addres"> {getUser(order.userId)?.address}</div> 
                 <div className="date">
                 {new Date(order.createdAt).toLocaleDateString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                 </div>
                 <div className="status waited ">{order.idPaid?"Đã thanh toán":"Chưa thanh toán"}</div>
                 <div className="action">
                   <button className="accept-btn" onClick={()=>handleClickAccept(order._id,order)}>Duyệt</button>
                   <button className="delete-btn">Hủy</button>
                 </div>
                 
             </div> 
             <div className="order_detail" >
                 <img src={order.image}/> 
                 <div>
                   <div style={{display:"flex"}}>
                     <div className="proName">Tên sản phẩm</div>
                     <div className="proAmount">Số lượng: </div>
                     <div className="proAmount">Màu: </div>
                     <div className="proPrice">Tổng tiền: </div>
                   </div>
                   <div style={{display:"flex"}} >
                     <div className="proName">{order.name}</div>
                     <div className="proAmount">{order.amount} </div>
                     <div className="proAmount">{order.color} </div>
                     <div className="proPrice">{order.totalPrice} vnđ </div>
                 </div>
                 </div>             
             </div>
         </div>
        )  
       })} 
      </div>  
      <Pagination 
                totalPage={totalPage * 10} 
                currentPage={currentPage} 
                setCurrentPage={setCurrentPage} 
            />
    </div> 
     );
}

export default OrderAccept;
