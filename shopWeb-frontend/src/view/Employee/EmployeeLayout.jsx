import React,{createContext,useState} from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar/SideBar'; // Import Sidebar
import Navbar from './Nav/Navbar';
import './employeeStyle.css';

export const FilterContext = createContext();

const AdminLayout = ({ isEmployee,user}) => {
  const [filter, setFilter] = useState('');
  return (
    <>
      {isEmployee ? (
        <FilterContext.Provider value={{ filter, setFilter }}>
          <div className="employee-layout">
            <Sidebar /> {/* Hiển thị Sidebar */}
            <main className="main-content">
              <Navbar setFilter={setFilter} user={user}/>
              <Outlet  /> {/* Đây là nơi mà các route con sẽ được render */}
            </main>
          </div>
        </FilterContext.Provider>
      ) : (
        <h1 className="notify">You do not have access to this page.</h1>
      )}
    </>
  );
};

export default AdminLayout;
