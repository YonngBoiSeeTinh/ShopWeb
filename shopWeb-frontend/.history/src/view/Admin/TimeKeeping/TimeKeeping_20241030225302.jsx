import React, { useState,useContext  }  from "react";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Pagination from '../../Pagination'
import './TimeKeeping.scss'
import { FilterContext } from '../AdminLayout';
const TimeKeeping = () => {
  const { filter } = useContext(FilterContext);
  console.log(filter);
  const [currentPage,setCurrentPage] = useState(0); 
  const fetchApi = async () => {
    try {
        const res = await axios.get(`http://localhost:3001/api/user/get`);     
        return res.data.data; // Đảm bảo đây là một mảng
        
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

  const query = useQuery({
    queryKey: ['products', currentPage],
    queryFn: fetchApi,
  });
  const querydata = query.data || [];
  const listCustomer = querydata.filter((item)=> item.role ==="employee")

  const itemsPerPage = 7; // Số lượng sản phẩm mỗi trang
  const totalPage = Math.ceil(listCustomer.length / itemsPerPage); 
  
  const listFilter = filter ?listCustomer.filter((item) => item.name.toLowerCase().includes(filter.toLowerCase()))
                            :listCustomer
  
  const startIndex = currentPage * itemsPerPage;
  const currentCus = listFilter.slice(startIndex, startIndex + itemsPerPage);
  
    return (

    <div className="timekeeping_container">
        <h3>Chấm công</h3>
        <div className="timekeeping_title">
          <div className="num">#</div>
          <div className="Name">Tên</div>
          <div className="date">
            <input type="date"/>
          </div>
          <div className="date">Có mặt</div>
          <div className="date">Vắng</div>
          <div className="date">Trễ</div>
        </div>
      <div className="timekeeping_list">
        {currentCus.map((item,index)=>(
          <div className="timekeeping_item">
          <div className="num">{index +1 }</div>
          <div className="Name">{item.name}</div>
          <div className="date">Ngày</div>
          <div className="date">
            <input type="checkbox"></input>
          </div>
          <div className="date">
            <input type="checkbox"></input>
          </div>
          <div className="date">
            <input type="checkbox"></input>
          </div>
          </div>
        ))}
       
      </div>
      <Pagination totalPage={totalPage*10} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </div> 
     );
}

export default TimeKeeping;
