import React,{useState, useEffect, useContext} from "react";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Pagination from '../../Pagination'
import { FilterContext } from '../AdminLayout';
const OrderAccept = ({setAlertMessage,setShowAlert, setType}) => {
  const { filter } = useContext(FilterContext);
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
  const { refetch } = query;
  const listOrder = query.data || [];
  let listAcceptOrder = listOrder.filter((item)=>item.accept &&!item.isPaid)
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
  if (filter) {
    listAcceptOrder = listAcceptOrder.filter((order) => {
      const user = getUser(order.userId);
      return user && user.name.toLowerCase().includes(filter.toLowerCase());
    });
  }else{
    listAcceptOrder = listOrder.filter((item)=>item.accept &&!item.isPaid)
  }
  const itemsPerPage = 5; // Số lượng sản phẩm mỗi trang
  const totalPage = Math.ceil(listAcceptOrder.length / itemsPerPage); 

  const startIndex = currentPage * itemsPerPage;
  const currentOders = listAcceptOrder.slice(startIndex, startIndex + itemsPerPage);


  
  const fetchApiProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/product/get`);
      return res.data.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  const queryProduct = useQuery({ queryKey: ['product'], queryFn: fetchApiProduct });
  const listProduct = queryProduct.data || [];

  const getProduct =(ProductId)=>{
    const Product = listProduct.filter((item)=>item._id === ProductId)
    return Product[0]
  }
  const handleClickAccept = (orderId) => {
    handleAcceptOrder(orderId);
  };

  const updateProductApi = async (productId, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:3001/api/product/update/${productId}`, updatedData);
      return response.data;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  };
  
  const handleUpdateProductStock = async (productId, color, amount) => {
    try {
      // Lấy dữ liệu sản phẩm hiện tại để cập nhật
      const product = await axios.get(`http://localhost:3001/api/product/getDetail/${productId}`);
      console.log('updatedColors',product);
      const updatedColors = product.data.colors.map((colorItem) => {
        if (colorItem.color === color) {
          return { ...colorItem, countInstock: colorItem.countInstock - amount };
        }
        return colorItem;
      });
     
  
      // Gọi API cập nhật sản phẩm với mảng colors đã cập nhật
      const updatedData = { colors: updatedColors };
      const result = await updateProductApi(productId, updatedData);
  
      if (result.status === 'OK') {
        console.log("Sản phẩm đã được cập nhật thành công!");
        // Thực hiện các hành động cần thiết sau khi cập nhật thành công
      } else {
        console.error("Cập nhật sản phẩm thất bại.");
      }
    } catch (error) {
      console.error("Error updating product stock:", error);
    }
  };
  
  const handleAcceptOrder = async (order) => {
    try {
      await handleUpdateProductStock(order?.productId, order?.color, order?.amount);
      
      // Cập nhật trạng thái đơn hàng
      // const res = await axios.put(`http://localhost:3001/api/order/update/${order?._id}`, {
      //   isPaid: true 
      // });
  
      // if (res.status === 200) { // Kiểm tra phản hồi chính xác từ API
      //   // Cập nhật lại số lượng tồn kho cho sản phẩm
      //   await handleUpdateProductStock(order?.productId, order?.color, order?.amount);
  
      //   setAlertMessage("Xác nhận đơn hàng thành công");
      //   refetch();
      //   setType("success");
      //   setShowAlert(true);
      //   return res.data.data;
      // }
    } catch (error) {
      setAlertMessage('Error updating order:', error.message);
      setType("danger");
      setShowAlert(true);
      throw error;
    }
  };
  
  const handleDeleteOrder =async(id)=>{
    try {
      const res = await axios.delete(`http://localhost:3001/api/order/delete/${id}`);
      if (res.status === 200) {
        setAlertMessage("Đơn hàng đã được xóa thành công!");
        refetch()
        setType("success");
        setShowAlert(true);
       
      }
    } catch (error) {
      console.error('Lỗi khi xóa đơn hàng:', error);
      alert('Có lỗi xảy ra khi xóa đơn hàng. Vui lòng thử lại!');
    }
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
                   <button className="accept-btn" onClick={()=>handleClickAccept(order)}>Duyệt</button>
                   <button className="delete-btn"  onClick={()=>handleDeleteOrder(order._id)}>Hủy</button>
                 </div>
                 
             </div> 
             <div className="order_detail" >
             <img src={getProduct(order.productId)?.image}/>
                 <div>
                   <div style={{display:"flex"}}>
                     <div className="proName">Tên sản phẩm</div>
                     <div className="proAmount">Số lượng: </div>
                     <div className="proAmount">Màu: </div>
                     <div className="proPrice">Tổng tiền: </div>
                   </div>
                   <div style={{display:"flex"}} >
                   <div className="proName">{getProduct(order.productId)?.name}</div>
                     <div className="proAmount">{order.amount} </div>
                     <div className="proAmount">{order.color} </div>
                     <div className="proPriceP">{order.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} </div>
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
