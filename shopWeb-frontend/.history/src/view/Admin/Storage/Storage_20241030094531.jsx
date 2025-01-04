import React,{useState,useContext} from "react";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Pagination from '../../Pagination'
import './Storage.scss'
import { FilterContext } from '../AdminLayout';
import { Link } from "react-router-dom";
const Storage = () => {
    const { filter } = useContext(FilterContext);
    console.log(filter);
    const [currentPage,setCurrentPage] = useState(0); 
    const fetchApi = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/product/get`);     
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
    const listProduct = query.data || [];
    
    const listFilter = filter ?listProduct.filter((item) => item.name.toLowerCase().includes(filter.toLowerCase()))
    :listProduct

    const itemsPerPage = 7; // Số lượng sản phẩm mỗi trang
    const totalPage = Math.ceil(listProduct.length / itemsPerPage); 

    const startIndex = currentPage * itemsPerPage;
    const currentPro = listFilter.slice(startIndex, startIndex + itemsPerPage);
    return (
    <div className="storage_container">
      <h3>Tồn kho</h3>
      <div className="storage_title">
        <div className="num"> #</div>
        <div className="name"> Tên sản phẩm</div>
        <div className="version"> Màu</div>
        <div className="count"> Số lượng</div>
        <div className="action"> Hành động</div>
      </div>
      <div className="storage_list">
        {currentPro.map((item, index)=>(
              <div className="storage_item">
              <div className="num"> {index+1} </div>
              <div className="name"> {item.name}</div>
              <div className="version">    {item?.colors?.length > 0 ? (
        item.colors.map((color, index) => (
                    <div className="version_detail" key={index}>  
                        <div className="color_name"> {color.color }</div>
                        <div className="color_icon" style={{ background: color.code }}> </div>
                        <div className="count"> {color.countInstock  > 0 ? color.countInstock : "Hết hàng"}</div>
                    </div>   
                ))
            ) : (
                <div>Loading...</div>
            )}</div>
              <div className="action"><Link>Nhập hàng</Link></div>
          </div>
        ))}
      
      </div>
      <Pagination  totalPage={totalPage*10} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </div> 
     );
}

export default Storage;
