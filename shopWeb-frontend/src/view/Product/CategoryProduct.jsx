import React from "react";
import { useParams } from "react-router-dom";
import '../Home/home.scss';
import ProductListSearch from "./ProductListSearch.jsx"; 
import Banner from "../Home/banner.js";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useLocation } from "react-router-dom"

const CategoryProduct = () => {
    const { category } = useParams();

    const location = useLocation();
    const { name } = location.state || {};
    const fetchApi = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/product/get?filter=category&filter=${category}`);
            console.log('API Response:', res.data);
            return res.data.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    const { data: productList, isLoading, isError } = useQuery({
        queryKey: ['products', category],
        queryFn: fetchApi,
        enabled: !!category
    });
   
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading products. Please try again later.</div>;
    }
  
    return (
        <div>
            <Banner />
            <section className="Pro-container">
            
               
                <div className="contain-products">
                    {/* Kiểm tra productList trước khi truyền vào ProductListSearch */}
                    {productList && productList.length > 0 ? (
                        <ProductListSearch filter={category} listPro={productList} name={name} />
                    ) : (
                        <div>Không có sản phẩm nào cho {category}</div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default CategoryProduct;
