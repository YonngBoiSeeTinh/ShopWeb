import React,{useState} from 'react';

const OrderNav = ({ handleSeeNonAccept, handleSeeAccept, handleSeePaided }) => {
  const [activeTab, setActiveTab] = useState('nonAccept'); // State lưu mục đang active

  const handleClick = (tabName, action) => {
    setActiveTab(tabName);
    action(); // Gọi hàm xử lý được truyền qua props
  };
  return (
    <aside className="">
      <div className="order_nav">
         <ul>
          <li
            className={activeTab === 'nonAccept' ? 'active' : ''}
            onClick={() => handleClick('nonAccept', handleSeeNonAccept)}
          >
            <span>Chưa xác nhận</span>
          </li>
          <li
            className={activeTab === 'accept' ? 'active' : ''}
            onClick={() => handleClick('accept', handleSeeAccept)}
          >
            <span>Đã xác nhận</span>
          </li>
          <li
            className={activeTab === 'paid' ? 'active' : ''}
            onClick={() => handleClick('paid', handleSeePaided)}
          >
            <span>Giao thành công</span>
          </li>
        </ul>
      </div>
    </aside>
  );
};


export default OrderNav;


