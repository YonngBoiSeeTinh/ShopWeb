import React from 'react';
import { Link,useNavigate } from 'react-router-dom';

const OrderNav = ({listOrder}) => {

  return (
    <aside className="">
      <div className="order_nav">
        <ul>
          <Link  to={{
            pathname: "/admin/orders/nonAccept",
            state: { listOrder: listOrder } 
          }} style={{ textDecoration: "none" }}>
            <li>
              <span>Chưa xác nhận</span>
            </li>
          </Link>
          <Link  to={{
            pathname: "/admin/orders/accept",
            state: { status: "nonAccept" } 
          }} style={{ textDecoration: "none" }}>
            <li>     <span>Đã xác nhận</span>
            </li>
          </Link>
          <Link  to={{
            pathname: "/admin/orders/paied",
            state: { status: "nonAccept" } 
          }} style={{ textDecoration: "none" }}>
            <li>   <span>Giao thành công</span>
            </li>
          </Link>
        </ul>
      </div>
    </aside>
  );
};

export default OrderNav;


