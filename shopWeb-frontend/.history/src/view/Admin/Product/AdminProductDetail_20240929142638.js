import React from "react";
import './ProductDetail.css'; // Đảm bảo bạn đã tạo và liên kết file CSS
import { useEffect } from "react";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

function ProductDetail() {
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const { name } = useParams();

    const fetchApi = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/product/get?filter=name&filter=${name}`);
            console.log('API Response:', res.data);
            return res.data.data[0];
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    const query = useQuery({
        queryKey: ['products', name],
        queryFn: fetchApi
    });


    const product = query.data;

    // Kiểm tra xem product có tồn tại không
    if (!product) {
        return <div>Product not found.</div>;
    }
   

    return (
        <div className="product-container">
            <ProductGallery img={product.image} />
            <ProductInfo product={product} />
        </div>
    );
    
}

function ProductGallery({ img }) {
    return (
        <section>
            <div className="produc-detail">
            <div className="product-image">
            <div className="product-gallery">      
                <img src={img} alt="Sản phẩm" className="main-image" />            
            </div>
                <div className="thumbnail-gallery">
                    <img src={img} alt="Sản phẩm nhỏ" className="thumbnail" />
                    <img src={img} alt="Sản phẩm nhỏ" className="thumbnail" />
                    <img src={img} alt="Sản phẩm nhỏ" className="thumbnail" />
                    <img src={img} alt="Sản phẩm nhỏ" className="thumbnail" />
                    <img src={img} alt="Sản phẩm nhỏ" className="thumbnail" />
                    <img src={img} alt="Sản phẩm nhỏ" className="thumbnail" />
                    <img src={img} alt="Sản phẩm nhỏ" className="thumbnail" />
                </div>
            </div>
            </div>
            
        </section>
              
    );
}

function ProductInfo({ product }) {
    const details = [
        { key: "Màn hình", value: product.detail?.screen || "Không có thông tin" },
        { key: "Hệ điều hành", value: product.detail?.os || "Không có thông tin" },
        { key: "Camera sau", value: product.detail?.camara || "Không có thông tin" },
        { key: "Camera trước", value: product.detail?.camaraFront || "Không có thông tin" },
        { key: "CPU", value: product.detail?.cpu || "Không có thông tin" },
        { key: "RAM", value: product.detail?.ram || "Không có thông tin" },
        { key: "ROM", value: product.detail?.rom || "Không có thông tin" },
        { key: "MicroSD", value: product.detail?.microUSB || "Không có thông tin" },
        { key: "Pin", value: product.detail?.battery || "Không có thông tin" },
    ];
    
    return (
        <div className="product-info">
            <form className="product-update-form" >
            <div className="product-update-form_item">
                <div>Tên sản phẩm</div>
                <input
                    type="text"
                    name="name"
                 
                    required
                />
            </div>
            <div className="product-update-form_item">
                <div>Công ty</div>
                <input
                    type="text"
                    name="company"              
                    required
                />
            </div>
            <div className="product-update-form_item">
                <div>Giá</div>
                <input
                    type="number"
                    name="price"
                    required
                />
            </div>
            
          
            <button type="submit">Cập nhật sản phẩm</button>
        </form>
            
        </div>
    );
}




export default ProductDetail;
