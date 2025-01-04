import React  from "react";
import ProductItem from "./ProductItem.js"; 
import { useNavigate } from "react-router-dom";
import './ProductList.scss'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const ProductListSearch =( { color,filter })=> {
  
    
  const fetchApi = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/product/get?filter=name&filter=${filter}&page =0 `);
      return res.data.data; // Đảm bảo đây là một mảng
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  

  const query = useQuery({ queryKey: ['products'], queryFn: fetchApi });
  const listPro = query.data || []; // Lấy danh sách sản phẩm từ query

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
    const filterList = listPro
  
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
      </div>
    );
  
}

export default ProductListSearch;
