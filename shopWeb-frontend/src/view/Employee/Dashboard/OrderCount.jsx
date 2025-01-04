import React from 'react';
import { Link } from 'react-router-dom';
import './dashboard.scss';

const OrderCount = ({OrderList = []}) => {
  
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // 0 - 11
  const currentYear = currentDate.getFullYear();
  
  const getOrderCountByMonth = (orders) => {
    const count = {
        currentMonth: 0,
        previousMonth: 0,
    };
    orders.forEach(order => {
        const createdAt = new Date(order.createdAt); // Giả sử `createdAt` là thuộc tính chứa ngày tạo 
        const month = createdAt.getMonth();
        const year = createdAt.getFullYear();

        if (year === currentYear) {
            if (month === currentMonth) {
                count.currentMonth += 1; // Tăng số lượng cho tháng hiện tại
            } else if (month === currentMonth - 1) {
                count.previousMonth += 1; // Tăng số lượng cho tháng trước
            }
        }
        else if (year === currentYear - 1 && currentMonth === 0 && month === 11) {
          // Xử lý trường hợp khi tháng hiện tại là tháng 1 (currentMonth === 0), cần so sánh với tháng 12 của năm trước
          count.previousMonth += 1;
      }
    });

    return count;
};

const orderCount =  OrderList.length > 0 ? getOrderCountByMonth(OrderList) : { currentMonth: 0, previousMonth: 0 }; 
let compareOrder = 0;
let classNameForCompare = 'neutral';
if (orderCount.previousMonth > 0) {
  compareOrder = ((orderCount.currentMonth - orderCount.previousMonth) / orderCount.previousMonth) * 100;
  classNameForCompare = compareOrder > 0 ? 'increase' : 'decrease';
  compareOrder = Math.round(compareOrder); 
}


  return (   
         <div className='card-top_item'>
            <h4 className='title'>ĐƠN HÀNG</h4>
            <span className={classNameForCompare}>{compareOrder}%</span>
            <div className='amount'>{orderCount.currentMonth}</div>
            <Link className='link'>Xem chi tiết</Link>
            <span className='icon'>icon</span>
         </div>
    
  );
  
};

export default OrderCount;
