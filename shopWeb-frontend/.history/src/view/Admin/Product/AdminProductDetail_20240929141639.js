import React, { useState, useEffect } from "react";
import './ProductDetail.css'; 
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

function ProductDetail() {
    const { name } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Hàm lấy dữ liệu sản phẩm
    const fetchApi = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/product/get?filter=name&filter=${name}`);
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

    // Kiểm tra sản phẩm có tồn tại hay không
    if (!product) {
        return <div>Product not found.</div>;
    }

    return (
        <div className="product-container">
            <ProductUpdateForm product={product} />
        </div>
    );
}

function ProductUpdateForm({ product }) {
    const [updatedProduct, setUpdatedProduct] = useState({ ...product });

    // Hàm xử lý thay đổi input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Hàm gửi yêu cầu cập nhật sản phẩm
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3001/api/product/update`, updatedProduct);
            console.log("Update response:", response.data);
            alert("Product updated successfully!");
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    return (
        <form className="product-update-form" onSubmit={handleUpdate}>
            <div>
                <label>Tên sản phẩm</label>
                <input
                    type="text"
                    name="name"
                    value={updatedProduct.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Công ty</label>
                <input
                    type="text"
                    name="company"
                    value={updatedProduct.company}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Giá</label>
                <input
                    type="number"
                    name="price"
                    value={updatedProduct.price}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Mô tả</label>
                <textarea
                    name="description"
                    value={updatedProduct.description}
                    onChange={handleChange}
                    required
                />
            </div>
            {/* Thêm các trường cần cập nhật */}
            <button type="submit">Cập nhật sản phẩm</button>
        </form>
    );
}

export default ProductDetail;
