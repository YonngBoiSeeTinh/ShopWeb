import React from 'react';
import { Link,useNavigate } from 'react-router-dom';

const OrderNav = () => {

  return (
    <aside className="">
      <div className="order_nav">
        <ul>
          <Link to="/admin/orders/nonAccept" style={{ textDecoration: "none" }}>
            <li>
             
              <span>Chưa xác nhận</span>
            </li>
          </Link>
          <Link to="/admin/orders/accept" style={{ textDecoration: "none" }}>
            <li>
             
              <span>Đã xác nhận</span>
            </li>
          </Link>
          <Link to="/admin/orders/paided" style={{ textDecoration: "none" }}>
            <li>
             
              <span>Giao thành công</span>
            </li>
          </Link>
        </ul>
      </div>
    </aside>
  );
};

export default OrderNav;


