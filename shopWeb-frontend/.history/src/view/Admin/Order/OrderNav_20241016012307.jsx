import React from 'react';
import { Link,useNavigate } from 'react-router-dom';

const Sidebar = () => {

  return (
    <aside className="">
      <div className="nav">
        <ul>
          <Link to="/admin/dashboard" style={{ textDecoration: "none" }}>
            <li>
             
              <span>Chưa xác nhận</span>
            </li>
          </Link>
          <Link to="/admin/customers" style={{ textDecoration: "none" }}>
            <li>
             
              <span>Đã xác nhận</span>
            </li>
          </Link>
          <Link to="/admin/products" style={{ textDecoration: "none" }}>
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


