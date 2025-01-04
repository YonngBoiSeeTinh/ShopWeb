import React, { Component } from "react";
import ProductItem from "./ProductItem.js"; // Import component hiển thị sản phẩm

const HomeProductList =( { tenKhung, color, len, listPro, setFilterList })=> {
  
    // Đảm bảo rằng listPro là một mảng
    const validListPro = Array.isArray(listPro) ? listPro : [];

    if (validListPro.length === 0) {
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
    const displayLen = validListPro.length < len ? validListPro.length : len;

    return (
      <div className="khungSanPham" style={borderColor}>
        <h3 className="tenKhung" style={{ background: gradient, color: 'white' }}>
          {tenKhung}
        </h3>

        <div className="listSpTrongKhung flexContain">
          {validListPro.slice(0, displayLen).map((product, index) => (
            <ProductItem key={index} product={product} />
          ))}
        </div>

        <a className="xemTatCa" onClick={() => setFilterList(validListPro)} >
          Xem tất cả {validListPro.length} sản phẩm
        </a>
      </div>
    );
  
}

export default HomeProductList;
