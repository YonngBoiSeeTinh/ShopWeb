
import { Link } from 'react-router-dom';


const RevenueCount = ({ OrderList = [] }) => {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
  
    const getRevenueCountByDay = (orders) => {
      const count = {
        currentDay: 0,
        previousDay: 0,
      };
  
      orders.forEach(order => {
        const createdAt = new Date(order.updatedAt); // Giả sử `createdAt` là thuộc tính chứa ngày tạo
        const day = createdAt.getDate();
        const month = createdAt.getMonth();
        const year = createdAt.getFullYear();
  
        if (year === currentYear && month === currentMonth && order.isPaid) {
          if (day === currentDay ) {
            count.currentDay += order.totalPrice;
          } else if (day === currentDay - 1) {
            count.previousDay += order.totalPrice;
          }
        } else if (year === currentYear && currentDay === 1 && day === new Date(currentYear, currentMonth - 1, 0).getDate()) {
          // Xử lý trường hợp ngày hiện tại là 1, cần so sánh với ngày cuối cùng của tháng trước
          count.previousDay += order.totalPrice;
        }
      });
  
      return count;
    };
  
    const RevenueCount = OrderList.length > 0 ? getRevenueCountByDay(OrderList) : { currentDay: 0, previousDay: 0 };
    let compareOrder = 0;
    let classNameForCompare = 'neutral';
  
    if (RevenueCount.previousDay > 0) {
      compareOrder = ((RevenueCount.currentDay - RevenueCount.previousDay) / RevenueCount.previousDay) * 100;
      classNameForCompare = compareOrder > 0 ? 'increase' : 'decrease';
      compareOrder = Math.round(compareOrder);
    }
  
    return (
      <div className='card-top_item'>
        <h4 className='title'>DOANH THU HÔM NAY</h4>
        <span className={classNameForCompare}>{compareOrder}%</span>
        <div className='revenue'>{RevenueCount.currentDay.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
        <Link className='link'>Xem chi tiết</Link>
        <span className='icon'>icon</span>
      </div>
    );
  };
  
  export default RevenueCount;
  