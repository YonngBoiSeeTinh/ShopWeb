import React from "react";
import { useParams } from "react-router-dom";
import '../Home/home.css';
import HomeProductList from "../Home/HomeProduct-list"; 
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

    const query = useQuery({
        queryKey: ['products', companyName], // Thêm companyName vào queryKey
        queryFn: fetchApi,
        enabled: !!companyName // Chỉ chạy truy vấn nếu companyName có giá trị
    });
    const productList = query.data;

    return (
        <section>
             <div className="Pro-container">
            <Banner/>
            <img src="/img/banners/blackFriday.gif" alt="" style={{ width: '100%', marginTop: '10px' }} />
            <div className="contain-products">
                 <HomeProductList tenKhung={companyName} color={['#42bcf4', '#004c70']}  len={10} listPro ={productList} />  
            </div>
        </div>
        </section>
       
    );
};

export default ComProduct;
