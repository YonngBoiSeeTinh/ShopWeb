import React  from "react";
import ProductItem from "./ProductItem.js"; 
import { useNavigate } from "react-router-dom";
import './ProductList.scss'

const ProductList =( { color, listPro,filterPromo })=> {
  
    const navigate = useNavigate()

    const filterList = listPro.filter((item)=>item.promo.name === filterPromo)

    if (filterList.length === 0) {
      return (
        <div className="NoPro">
          <h3 className="nameList" style={{ color: 'red' }}>
            Không có sản phẩm để hiển thị.
          </h3>
        </div>
      );
    }
    let nameList ="";
    if(filterPromo === "giamgia"){
        nameList = "Giảm giá lớn"
    }
    else if(filterPromo === "moi"){
        nameList = "Mới ra mắt"
    }
    else {
         nameList = "Trả góp 0%"
    }

    const gradient = `linear-gradient(120deg, ${color[0]} 0%, ${color[1]} 50%, ${color[0]} 100%)`;
    const borderColor = { borderColor: color[0] };
    const displayLen = filterList.length < 5 ? filterList.length : 5;
    const handelSeeAll =()=>{
        navigate('/seeAll', { state: {nameList,filterList,color } });
      }
    return (
      <div className="ListPro" style={borderColor}>
        <h3 className="nameList" style={{ background: gradient, color: 'white' }}>
          {nameList}
        </h3>

        <div className="listProInfilter flexContain">
          {filterList.slice(0, displayLen).map((product, index) => (
            <ProductItem key={index} product={product} />
          ))}
        </div>

        <a className="seeAll" onClick={handelSeeAll} >
          Xem tất cả {filterList.length} sản phẩm
        </a>
      </div>
    );
  
}

export default ProductList;
