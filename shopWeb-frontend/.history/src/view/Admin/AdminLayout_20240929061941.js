import React from 'react';
import Header from './Header';
import Sidebar from './SideBar';
import Main from './Main';
import './adminStyle.css'; // Đảm bảo rằng bạn chuyển style sang file CSS

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <Header />
      <Sidebar />
      <Main>{children}</Main>
    </div>
  );
};

export default AdminLayout;
