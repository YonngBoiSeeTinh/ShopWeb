import React, { useState } from "react";
import ProductItem from "./ProductItem.js"; 
import './ProductList.scss'
import PaginationComponent from '../Pagination.jsx';
const ProductListSearch = ({ color, listPro, filter }) => {
  
  const [currentPage, setCurrentPage] = useState(1); // Quản lý trang hiện tại
  const itemsPerPage = 1; // Số lượng sản phẩm mỗi trang

  if (listPro.length === 0) {
    return (
      <div className="NoPro">
        <h3 className="nameList" style={{ color: 'red' }}>
          Không có sản phẩm để hiển thị.
        </h3>
      </div>
    );
  }

  const nameList = filter;
  const gradient = `linear-gradient(120deg, ${color[0]} 0%, ${color[1]} 50%, ${color[0]} 100%)`;
  const borderColor = { borderColor: color[0] };

  // Tính toán số trang
  const totalPages = Math.ceil(listPro.length / itemsPerPage);

  // Tính toán chỉ số bắt đầu và kết thúc để cắt danh sách sản phẩm
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = listPro.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="ListPro" style={borderColor}>
      <h3 className="nameList" style={{ background: gradient, color: 'white' }}>
        Kết quả tìm kiếm cho {nameList}
      </h3>

      <div className="listProInfilter flexContain">
        {currentProducts.map((product, index) => (
          <ProductItem key={index} product={product} />
        ))}
      </div>

      {/* Hiển thị phân trang */}
      <PaginationComponent 
                totalPage={totalPages * itemsPerPage} 
                currentPage={currentPage} 
                setCurrentPage={setCurrentPage} 
            />
    </div>
  );
};

export default ProductListSearch;
