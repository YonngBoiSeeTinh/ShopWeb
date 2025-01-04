import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './SideBar'; // Import Sidebar

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <Sidebar /> {/* Hiển thị Sidebar */}
      <main className="main-content">
        <Outlet /> {/* Đây là nơi mà các route con sẽ được render */}
      </main>
    </div>
  );
};

export default AdminLayout;
