import React,{useState, useEffect, useContext} from "react";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Pagination from '../../Pagination'
import { FilterContext } from '../EmployeeLayout';
import { version } from "process";
const OrderList = ({ setAlertMessage,setShowAlert, setType,listOrder = [],refetch}) => {
  const { filter } = useContext(FilterContext);
  const [seeDetail, setSeeDetail] = useState(false)
  const [ordeDetail, setOrderDetail] = useState(false) 
  const handelSeeDetail  =(order)=>{
    setSeeDetail(true)
    setOrderDetail(order)
  }
  const handleClose  =()=>{
    setSeeDetail(false)
   
  }

  const [currentPage, setCurrentPage] = useState(0);
 
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
  let listFilter = listOrder.filter((item)=>!item.accept)
  if (filter) {
    listFilter = listFilter.filter((order) => {
      const user = getUser(order.userId);
      return user && user.name.toLowerCase().includes(filter.toLowerCase());
    });
  }else{
    listFilter = listOrder
  }
  console.log("listOrder",listOrder);
  const itemsPerPage = 8; // Số lượng sản phẩm mỗi trang
  const totalPage = Math.ceil(listFilter.length / itemsPerPage); 

  const startIndex = currentPage * itemsPerPage;
  const currentOders = listFilter.slice(startIndex, startIndex + itemsPerPage);


  const handleAcceptOrder = async (order) => {
  
    const color = listProduct.find((pro) =>
                            pro._id === order.productId
                          )?.colors.find((color) => color.color === order.color)
    const  countInStock= color.version.find((version)=>version.name === order.version).countInstock || 0;
                          console.log(order);
    console.log('countInstock',countInStock,' amount ', order?.amount);
    if(countInStock>= order.amount){
      try {
        console.log('orderId', order._id);
        const res = await axios.put(`http://localhost:3001/api/order/update/${ order._id}`, {
          accept: true 
        });
        if (res.statusText === "OK") {
          refetch();
          setAlertMessage("Xác nhận đơn hàng thành công");
          setType("success");
          setShowAlert(true);
          return res.data.data;
      }
      } catch (error) {
        setAlertMessage('Error updating order:', error);
        setType("danger");
        setShowAlert(true);
        throw error;
      }
    }else{
      setAlertMessage('Số lượng trong kho không đủ:');
        setType("danger");
        setShowAlert(true);
    }
  };
  const handleDelivery = async (order) => {
    try {
        const stockRes = await axios.put(`http://localhost:3001/api/product/updateStock/${order?.productId}`, {
            color: order?.color,
            amount: order?.amount,
            version:order?.version
        });
        const soldRes = await axios.put(`http://localhost:3001/api/product/updateSold/${order?.productId}`, {
          amount:order?.amount
      });
      
        if (stockRes.status === 200) {
            // If stock update is successful, proceed to update the order status
            const res = await axios.put(`http://localhost:3001/api/order/update/${order?._id}`, {
                isPaid: true ,
                
            });

            if (res.status === 200) {
                setAlertMessage("Xác nhận đơn hàng thành công");
                refetch();
                setType("success");
                setShowAlert(true);
                return res.data.data;
            } else {
                setAlertMessage("Lỗi cập nhật trạng thái đơn hàng");
                setType("danger");
                setShowAlert(true);
            }
        } else {
            setAlertMessage("Lỗi cập nhật tồn kho");
            setType("danger");
            setShowAlert(true);
        }
    } catch (error) {
      console.log(error.response?.data.message);
        setAlertMessage(`Lỗi: ${error.response?.data.message}`);
        setType("danger");
        setShowAlert(true);
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
                  <img className="customer_avatar" src={getUser(order.userId)?.avatar || ""}/> {order?.cusName}
                 </div>
                 <div className="addres"> 
                    <img className="order_item-image" src={getProduct(order.productId)?.image}/> 
                    <div className="proName">{getProduct(order.productId)?.name}</div>
                 </div>  
                 <div className="date">
                 {new Date(order.createdAt).toLocaleDateString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                 </div>
                 <div className={order.accept?"status accept ":"status nonaccept"}>{ order.isPaid? "Đã giao" : order.accept?"Đã duyệt":"Chưa duyệt"}</div>
                 <div className="action">
                    <div className="look_detail" onClick={()=>handelSeeDetail(order)}>Xem chi tiết</div>
                    <div style={{display:order.isPaid ? "none" : "flex"}}>
                      {order.accept ?  <button className="accept-btn" onClick={()=>handleDelivery(order)}> Giao </button>
                                  :  <button className="accept-btn" onClick={()=>handleAcceptOrder(order)}>Duyệt</button>}
                                 
                    </div>
                    <button className="delete-btn"  onClick={()=>handleDeleteOrder(order._id)}>Hủy</button>
                  
                 </div>
                 
             </div> 
         </div>
        )  
       })} 
       
      </div>  
      {seeDetail ?< div className="dialog-order_detail" >
                        <div className="dialog_header">
                          <h3>Chi tiết đơn hàng</h3>
                          <button onClick={handleClose}>x</button>
                        </div>
                        <div className="dialog_content">
                            <div className="dialog_title">
                              <div className="product">Sản phẩm</div>
                              <div className="amount">Số lượng</div>
                              <div className="colors">Màu</div>
                              <div className="version">Phiên bản</div>
                              <div className="total">Tổng tiền</div>
                            </div>
                            <div  className="dialog_infor" >
                              <div className=" product">
                                <img src={getProduct(ordeDetail.productId)?.image}/> 
                                <p> {getProduct(ordeDetail.productId)?.name} </p>
                              </div>
                              <div className="amount">{ordeDetail.amount} </div>
                              <div className="colors">{ordeDetail.color} </div>
                              <div className="version">{ordeDetail.version}</div>
                              <div className="total">{ordeDetail.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}  </div>
                            </div>
                            <div className="dialog_title">
                              <div className="customer">Khách hàng</div>
                              <div className="address">Địa chỉ</div>
                            </div>
                            <div  className="dialog_infor" >
                              <div className="customer" style={{marginLeft:"4px"}}>
                                <img className="customer_avatar" src={getUser(ordeDetail.userId)?.avatar || ""}/> {ordeDetail.cusName}
                              </div>
                              <div className="address">{ordeDetail.address}</div>
                            </div>      
                        </div>
                       
                  </div> : <div></div>}
      <Pagination 
                totalPage={totalPage * 10} 
                currentPage={currentPage} 
                setCurrentPage={setCurrentPage} 
            />
    </div> 
     );
}

export default OrderList;
