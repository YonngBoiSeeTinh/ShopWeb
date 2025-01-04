import React, { useState, useEffect } from "react";
import './ProductDetail.css'; 
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import ProductGallery from './ProductComnonent/UpdateProduct/ProductGallery'; // Nhập component ProductGallery
import ProductUpdateForm from './ProductComnonent/UpdateProduct/ProductUpdateForm'; // Nhập component ProductUpdateForm

function updatedProduct() {
    const { name } = useParams();
    const [imageLink, setImageLink] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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

    const [product, setProduct] = useState(null);
    useEffect(() => {
        if (query.data) {
            setProduct(query.data);
        }
    }, [query.data]);

    if (!product) {
        return <div>Product not found.</div>;
    }

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
        <div className="product-container">
            <ProductGallery img={product.image} imageLink={imageLink} handleFileChange={handleFileChange} />
            <ProductUpdateForm product={product} imageLink={imageLink} setProduct={setProduct} />
        </div>
    );
}

export default updatedProduct;
