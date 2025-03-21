import React,{useState, useEffect, useContext} from "react";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Pagination from '../../Pagination'
import { FilterContext } from '../EmployeeLayout';
const Order = () => {
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
  const listOrder = query.data || [];
  let listPaid = listOrder.filter((item)=>item.isPaid)
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
    listPaid = listPaid.filter((order) => {
      const user = getUser(order.userId);
      return user && user.name.toLowerCase().includes(filter.toLowerCase());
    });
  }else{
    listPaid = listOrder.filter((item)=>item.isPaid)
  }
  const itemsPerPage = 5; // Số lượng sản phẩm mỗi trang
  const totalPage = Math.ceil(listPaid.length / itemsPerPage); 

  const startIndex = currentPage * itemsPerPage;
  const currentOders = listPaid.slice(startIndex, startIndex + itemsPerPage);

  

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
  const getWarrantyStatus = (createdAt) => {
    const currentDate = new Date();
    const endDate = new Date(createdAt);
  
    // Tính toán ngày hết hạn bằng cách cộng thêm 6 tháng vào ngày cập nhật
    endDate.setMonth(endDate.getMonth() + 5);
    
    // Kiểm tra nếu ngày hiện tại nhỏ hơn ngày hết hạn, bảo hành còn hiệu lực
    const diffInTime = currentDate - endDate;
    const diffInDays = diffInTime / (1000 * 3600 * 24); // Chuyển đổi từ milliseconds sang days
  
    if (diffInDays < 0) {
      const remainingMonths = Math.ceil(Math.abs(diffInDays) / 30); // Số tháng còn lại
      return `${remainingMonths} tháng`;
    } else {
      return "Hết hạn";
    }
  };
    return (

    <div className="admin_order-item">
      <div style={{height:"490px"}}>
      {currentOders.map((order, index)=>{
        return(
          <div className="order" key ={index}>
           <div className="order_title order_item">
                 <div className="num">{index +1}</div>
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
                
                 <div className="status accept ">Đã thanh toán</div>
                 <div className="action">
                   <button className="accept-btn" style={{width:"150px"}}>Hoàn thành</button>
                 </div>
                 
             </div> 
             <div className="order_detail" >
             <img src={getProduct(order.productId)?.image}/>
                 <div>
                   <div style={{display:"flex"}}>
                     <div className="proName">Tên sản phẩm</div>
                     <div className="proAmountP">Số lượng: </div>
                     <div className="proAmountP">Màu: </div>
                     <div className="proAmountP">Bảo hành: </div>
                     <div className="proPrice">Tổng tiền: </div>
                   </div>
                   <div style={{display:"flex"}} >
                     <div className="proName" >
                     {getProduct(order.productId)?.name}
                     </div>
                     <div className="proAmountP">{order.amount} </div>
                     <div className="proAmountP">{order.color} </div>
                     <div className="warranty"> {getWarrantyStatus(order.createdAt)}</div>
                     <div className="proPriceP" >{order.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}  </div>
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
