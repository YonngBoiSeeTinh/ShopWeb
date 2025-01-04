import React, { Component } from "react";
import ProductItem from "./ProductItem.js"; // Import component hiển thị sản phẩm
import { useLocation } from 'react-router-dom';
import Banner from "../Home/banner.js";
const HomeProductList =( )=> {
  
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
    const displayLen = filterList.length < 8 ? filterList.length : 8;

    return (
      <>
       
        <div className="ListPro" style={{ ...borderColor, width: "80%" ,margin:"40px auto"}}>
        <Banner/>
          <h3 className="nameList" style={{ background: gradient, color: 'white' }}>
            {nameList}
          </h3>
  
          <div className="listProInfilter flexContain">
            {filterList.slice(0, displayLen).map((product, index) => (
              <ProductItem key={index} product={product} />
            ))}
          </div>
  
         
        </div>
      </>
      
      
    );
  
}

export default HomeProductList;
