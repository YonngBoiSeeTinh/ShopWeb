import React, { useState, useEffect } from "react";
import './ProductDetail.scss'; // Đảm bảo bạn đã tạo và liên kết file CSS
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import ProductGallery from "./ProductComnonent/UpdateProduct/ProductGallery";
import ProductUpdateForm from "./ProductComnonent/UpdateProduct/ProductUpdateForm";

function UpdateProduct({setAlertMessage,setShowAlert, setType}) {
    const { id } = useParams();
    console.log('proId', id);
    const [imageLink, setImageLink] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    
    const fetchApi = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/product/getDetail/${id}`);
            console.log('API Response:', res.data);
            return res.data.data[0];
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    const query = useQuery({
        queryKey: ['products', id],
        queryFn: fetchApi
    });
    const [product, setProduct] = useState(null);
    useEffect(() => {
        if (query.data) {
            setProduct(query.data);
        }
    }, [query.data]);
   

    // Kiểm tra nếu sản phẩm không tồn tại
    if (!product) {
        return <div>Product not found.</div>;
    }

    // Hàm xử lý thay đổi file ảnh
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageUrl = e.target.result;
                setImageLink(imageUrl);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="product_content">
              <div className="product_container">
            <ProductGallery img={product.image} imageLink={imageLink} handleFileChange={handleFileChange} />
            <ProductUpdateForm product={product} imageLink={imageLink} setProduct = {setProduct}
             setAlertMessage={setAlertMessage} setShowAlert={setShowAlert} setType={setType}/>
        </div>
        </div>
      
    );
}



export default UpdateProduct;
