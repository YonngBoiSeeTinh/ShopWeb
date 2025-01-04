import React from 'react';
import './adminProduct.css'
import ProductItem from './product-item'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';


const ProductsPage = () => {

    const fetchApi = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/product/get`);
        console.log('API Response:', res.data); // Kiểm tra dữ liệu trả về
        return res.data.data; // Đảm bảo đây là một mảng
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
    };
    

    const query = useQuery({ queryKey: ['products'], queryFn: fetchApi });

    const listPro = query.data || [];
    return (
      <div className="admin-product-container">

        <div className="admin-product-list">
          {listPro.map((product, index)=>(
                <ProductItem product = {product} productid={product._id} key={index} />
              
          ))}
             
        </div>
      <Link to="/admin/addProduct">
          <div className='btnAdd'>
            Them san pham
          </div>
      </Link>
      </div>
    );
  };

export default ProductsPage;
