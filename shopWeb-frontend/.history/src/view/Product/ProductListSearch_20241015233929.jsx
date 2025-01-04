import React  from "react";
import ProductItem from "./ProductItem.js"; 
import { useNavigate } from "react-router-dom";
import './ProductList.scss'

const ProductList =( { color, listPro,filter })=> {
  
    const navigate = useNavigate()
   

    if (listPro.length === 0) {
      return (
        <div className="NoPro">
          <h3 className="nameList" style={{ color: 'red' }}>
            Không có sản phẩm để hiển thị.
          </h3>
        </div>
      );
    }
    const nameList =filter;
   

    const gradient = `linear-gradient(120deg, ${color[0]} 0%, ${color[1]} 50%, ${color[0]} 100%)`;
    const borderColor = { borderColor: color[0] };
    const displayLen = listPro.length < 5 ? listPro.length : 5;
    const handelSeeAll =()=>{
      navigate('/seeAll', { state: {nameList,listPro,color } });
    }
    return (
      <div className="ListPro" style={borderColor}>
        <h3 className="nameList" style={{ background: gradient, color: 'white' }}>
          Kết quả tìm kiếm cho {nameList}
        </h3>

        <div className="listProInfilter flexContain">
          {listPro.slice(0, displayLen).map((product, index) => (
            <ProductItem key={index} product={product} />
          ))}
        </div>

        <a className="seeAll" onClick={handelSeeAll} >
          Xem tất cả {listPro.length} sản phẩm
        </a>
      </div>
    );
  
}

export default ProductList;
