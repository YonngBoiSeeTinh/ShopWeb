import React from "react";
import { useParams } from "react-router-dom";
import '../Home/home.css';
import ProductListSearch from "../Product/ProductListSearch"; 
import Banner from "../Home/banner";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const ComProduct = () => {
    const { companyName } = useParams();

    const fetchApi = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/product/get?filter=company&filter=${companyName}`);
            console.log('API Response:', res.data);
            return res.data.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    const { data: productList, isLoading, isError } = useQuery({
        queryKey: ['products', companyName],
        queryFn: fetchApi,
        enabled: !!companyName
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading products. Please try again later.</div>;
    }

    return (
        <section>
            <div className="Pro-container">
                <Banner />
                <img src="/img/banners/blackFriday.gif" alt="" style={{ width: '100%', marginTop: '10px' }} />
                <div className="contain-products">
                    {/* Kiểm tra productList trước khi truyền vào ProductListSearch */}
                    {productList && productList.length > 0 ? (
                        <ProductListSearch filter={companyName} listPro={productList} />
                    ) : (
                        <div>Không có sản phẩm nào cho {companyName}</div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ComProduct;
