import React from 'react';
import { Link,useNavigate } from 'react-router-dom';

const Sidebar = () => {

  return (
    <aside className="">
      <div className="nav">
        <ul>
          <Link to="/order/nonAccept" style={{ textDecoration: "none" }}>
            <li>
             
              <span>Chưa xác nhận</span>
            </li>
          </Link>
          <Link to="/order/accept" style={{ textDecoration: "none" }}>
            <li>
             
              <span>Đã xác nhận</span>
            </li>
          </Link>
          <Link to="/order/paided" style={{ textDecoration: "none" }}>
            <li>
             
              <span>Giao thành công</span>
            </li>
          </Link>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;


