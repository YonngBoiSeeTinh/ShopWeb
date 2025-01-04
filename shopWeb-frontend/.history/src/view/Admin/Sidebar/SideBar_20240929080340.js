import React from 'react';
import { Link } from 'react-router-dom';
import './sideBar.css'
const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul className="nav">
        <li className="nav-title">MENU</li>
        <li className="nav-item">
          <Link to="/admin/dashboard" className="nav-link"><i className="fa fa-home"></i> Trang Chủ</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/products" className="nav-link"><i className="fa fa-th-large"></i> Sản Phẩm</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/orders" className="nav-link"><i className="fa fa-file-text-o"></i> Đơn Hàng</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/customers" className="nav-link"><i className="fa fa-address-book-o"></i> Khách Hàng</Link>
        </li>
        <li className="nav-item">
          <hr />
        </li>
        <li className="nav-item">
          <Link to="/" className="nav-link" onClick={() => alert("Logged out")}>
            <i className="fa fa-arrow-left"></i> Đăng xuất (về Trang chủ)
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
