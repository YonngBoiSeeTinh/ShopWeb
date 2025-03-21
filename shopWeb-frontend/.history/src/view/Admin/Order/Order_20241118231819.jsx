import React,{useState, useEffect, useContext} from "react";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Pagination from '../../Pagination'
import { FilterContext } from '../AdminLayout';
import ProductList from "../../Product/ProductList";
const Order = ({ setAlertMessage,setShowAlert, setType}) => {
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
  let listNonAccept = listOrder.filter((item)=>!item.accept)
  if (filter) {
    listNonAccept = listNonAccept.filter((order) => {
      const user = getUser(order.userId);
      return user && user.name.toLowerCase().includes(filter.toLowerCase());
    });
  }else{
    listNonAccept = listOrder.filter((item)=>!item.accept)
  }
  const itemsPerPage = 5; // Số lượng sản phẩm mỗi trang
  const totalPage = Math.ceil(listNonAccept.length / itemsPerPage); 

  const startIndex = currentPage * itemsPerPage;
  const currentOders = listNonAccept.slice(startIndex, startIndex + itemsPerPage);



  const handleAcceptOrder = async (order) => {
    console.log(order);
    const countInStock = listProduct.find((pro) =>
                            pro._id === order.productId
                          )?.colors.find((color) => color.color === order.color)?.countInStock || 0;
  console.log(countInStock);
    // try {
    //   console.log('orderId', order._id);
    //   const res = await axios.put(`http://localhost:3001/api/order/update/${ order._id}`, {
    //     accept: true 
    //   });
    //   if (res.statusText === "OK") {
    //     refetch();
    //     setAlertMessage("Xác nhận đơn hàng thành công");
       
    //     setType("success");
    //     setShowAlert(true);
    //     return res.data.data;
    // }
    // } catch (error) {
    //   setAlertMessage('Error updating order:', error);
    //   setType("danger");
    //   setShowAlert(true);
    //   throw error;
    // }
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

  

  const getProduct =(ProductId)=>{
    const Product = listProduct.filter((item)=>item._id === ProductId)
    return Product[0]
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
                 <div className="status nonaccept ">{order.accept?"Đã duyệt":"Chưa duyệt"}</div>
                 <div className="action">
                   <button className="accept-btn" onClick={()=>handleAcceptOrder(order)}>Duyệt</button>
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
                     <div className="proPriceP">{order.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}  </div>
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

export default Order;
