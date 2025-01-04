import React, { useState } from "react";
import ProductItem from "./ProductItem.jsx"; // Import component hiển thị sản phẩm
import PaginationComponent from '../../Pagination.jsx';

const SeeAllList =( {listPro})=> {
   
   const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại bắt đầu từ 0
   const nameList ="Danh sách sản phẩm" 
    if (listPro.length === 0) {
      return (
        <div className="ListPro">
          <h3 className="nameList" style={{ color: 'red' }}>
            Không có sản phẩm để hiển thị.
          </h3>
        </div>
      );
    }

    const gradient = `linear-gradient(120deg, #74ebd5 0%, #ACB6E5 50%, #74ebd5 100%)`;
    const borderColor = { borderColor: "#74ebd5" };
  
    const itemsPerPage = 8; // Số lượng sản phẩm mỗi trang
    const totalPage = Math.ceil(listPro.length / itemsPerPage); // Tổng số trang
    
  
    // Tính toán các sản phẩm cần hiển thị cho trang hiện tại
    const startIndex = currentPage * itemsPerPage;
    const currentProducts = listPro.slice(startIndex, startIndex + itemsPerPage);

    return (
      <div style={{ ...borderColor}>
        <div className="ListPro" style={{marginTop:"=120px", minHeight:"600px"}}>
          <h3 className="nameList" style={{ background: gradient, color: 'white' }}>
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
      </div>
      
      
    );
  
}

export default SeeAllList;
