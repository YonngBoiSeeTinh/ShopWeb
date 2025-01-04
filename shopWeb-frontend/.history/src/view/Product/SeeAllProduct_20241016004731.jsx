import React, { useState } from "react";
import ProductItem from "./ProductItem.js"; // Import component hiển thị sản phẩm
import { useLocation } from 'react-router-dom';
import Banner from "../Home/banner.js";
const SeeAllList =( )=> {

   const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại bắt đầu từ 0
    const location = useLocation();
    const filterList = location.state?.filterList; 
    const nameList = location.state?.nameList; 
    const color = location.state?.color; 

    if (filterList.length === 0) {
      return (
        <div className="khungSanPham">
          <h3 className="tenKhung" style={{ color: 'red' }}>
            Không có sản phẩm để hiển thị.
          </h3>
        </div>
      );
    }

    const gradient = `linear-gradient(120deg, ${color[0]} 0%, ${color[1]} 50%, ${color[0]} 100%)`;
    const borderColor = { borderColor: color[0] };
  
    const itemsPerPage = 4; // Số lượng sản phẩm mỗi trang
    const totalPage = Math.ceil(filterList.length / itemsPerPage); // Tổng số trang
    
  
    // Tính toán các sản phẩm cần hiển thị cho trang hiện tại
    const startIndex = currentPage * itemsPerPage;
    const currentProducts = filterList.slice(startIndex, startIndex + itemsPerPage);

    return (
      <div style={{ ...borderColor, width: "80%" ,margin:"40px auto"}}>
        <Banner/>
        <div className="ListPro" style={borderColor}>
        
          <h3 className="nameList" style={{ background: gradient, color: 'white' }}>
            {nameList}
          </h3>
  
          <div className="listProInfilter flexContain">
            {currentProducts.map((product, index) => (
              <ProductItem key={index} product={product} />
            ))}
          </div>
  
         
        </div>
      </div>
      
      
    );
  
}

export default SeeAllList;
