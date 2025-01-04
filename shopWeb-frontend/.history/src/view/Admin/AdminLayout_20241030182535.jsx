import React,{createContext,useState, useEffect} from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar/SideBar'; // Import Sidebar
import Navbar from './Nav/Navbar';
import './adminStyle.css';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
export const FilterContext = createContext();

const AdminLayout = ({ isAdmin, notity, setNotify }) => {
  const [filter, setFilter] = useState('');

  const fetchApi = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/order/get?sort=createdAt&sort=desc`);
      return res.data.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  const query = useQuery({ queryKey: ['orders'], queryFn: fetchApi });
  const listOrder = query.data || [];
 
  let listNonAccept = listOrder.filter((item)=>!item.accept)

  useEffect(() => {
    if (listNonAccept.length > 0) {
        const message = `Có ${listNonAccept.length} đơn hàng mới chưa xác nhận` ;
       
        setNotify(prev => {
            if (!prev.includes(message)) {
                return [...prev,  ]; 
            }
            return prev; 
        });
    }
}, [listNonAccept, setNotify]);
  
  return (
    <>
      {isAdmin ? (
        <FilterContext.Provider value={{ filter, setFilter }}>
          <div className="admin-layout">
            <Sidebar /> {/* Hiển thị Sidebar */}
            <main className="main-content">
              <Navbar setFilter={setFilter} notity={notity} setNotify={setNotify} />
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
