import React, { useState } from "react";
import ProductItem from "./ProductItem.js"; // Import component hiển thị sản phẩm
import { useLocation } from 'react-router-dom';
import Banner from "../Home/banner.js";
import PaginationComponent from '../Pagination.jsx';

const SeeAllList =( )=> {

   const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại bắt đầu từ 0
    const location = useLocation();
    const filterList = location.state?.listPro || []; 
    const nameList = location.state?.nameList; 


    if (filterList.length === 0) {
      return (
        <div className="khungSanPham">
          <h3 className="tenKhung" >
            Không có sản phẩm để hiển thị.
          </h3>
        </div>
      );
    }

    const itemsPerPage = 8; // Số lượng sản phẩm mỗi trang
    const totalPage = Math.ceil(filterList.length / itemsPerPage); // Tổng số trang
    
  
    // Tính toán các sản phẩm cần hiển thị cho trang hiện tại
    const startIndex = currentPage * itemsPerPage;
    const currentProducts = filterList.slice(startIndex, startIndex + itemsPerPage);

    return (
      <div >
        <Banner/>
        <section className="Pro-container">
          <div className="ListPro" >
            
            <h3 className="nameList" style={{ color: 'white' }}>
              {nameList}
            </h3>

            <div className="listProInfilter flexContain">
              {currentProducts.map((product, index) => (
                <ProductItem key={index} product={product} />
              ))}
            </div>

              {/* Hiển thị phân trang */}
            <PaginationComponent 
                      totalPage={totalPage * 10} 
                      currentPage={currentPage} 
                      setCurrentPage={setCurrentPage} 
              />
          </div>
        </section>
        
      </div>
      
      
    );
  
}

export default SeeAllList;
