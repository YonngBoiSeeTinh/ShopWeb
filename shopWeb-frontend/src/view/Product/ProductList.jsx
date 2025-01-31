import React  from "react";
import ProductItem from "./ProductItem.js"; 
import { useNavigate } from "react-router-dom";
import './style/ProductList.scss'

const ProductList =( { color, listPro =[]})=> {
  
    const navigate = useNavigate()
    const products = Array.isArray(listPro) ? listPro : [];
    if (listPro.length === 0) {
      return (
        <div className="NoPro">
          <h3 className="nameList" style={{ color: 'red' }}>
            Không có sản phẩm để hiển thị.
          </h3>
        </div>
      );
    }
    const nameList =""
    const handelSeeAll =()=>{
        navigate('/seeAll', { state: {nameList,listPro } });
    }
    return (
      <div className="ListPro" >
        <h3 className="nameList">
          FLASH SALE
        </h3>

        <div className="productList">
          {products && products.length > 0 ? products.map((product, index) => ( 
            <ProductItem key={index} product={product} /> 
          )) :(
            <div>Loading...   </div>
          )}
        </div>

        <a className="seeAll" onClick={handelSeeAll} >
          Xem tất cả {products.length} sản phẩm
        </a>
      </div>
    );
  
}

export default ProductList;
