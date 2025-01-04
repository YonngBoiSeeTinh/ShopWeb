import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
const Sidebar = () => {

  return (
    <aside className="">
      <div className="nav">
        <ul>
          <Link to="/admin/dashboard" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <Link to="/admin/customers" style={{ textDecoration: "none" }}>
            <li>
              <Person3OutlinedIcon className="icon" />
              <span>Khách hàng</span>
            </li>
          </Link>
          <Link to="/admin/products" style={{ textDecoration: "none" }}>
            <li>
              <LocalGroceryStoreOutlinedIcon className="icon" />
              <span>Sản phẩm</span>
            </li>
          </Link>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;


