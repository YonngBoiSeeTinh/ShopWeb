import React, { useState, useEffect } from "react";
import axios from 'axios';
import ProductGallery from './ProductGallery';
import ProductForm from './ProductForm';
import ProductOptions from './ProductOptions';
import ProductPromo from './ProductPromo';
import './ProductDetail.css';

function AddProduct() {
    const [imageLink, setImageLink] = useState('');
    const initialProductState = {
        name: '',
        company: '',
        image: '',
        price: Number('0'),
        rating: Number('5'),
        rateCount: Number('0'),
        description: '',
        promo: {
            name: '',
            value: Number(0),
            oldPrice: Number(0)
        },
        detail: {
            screen: 'chưa có thông tin',
            os: 'chưa có thông tin',
            camera: 'chưa có thông tin',
            cameraFront: 'chưa có thông tin',
            cpu: 'chưa có thông tin',
            ram: 'chưa có thông tin',
            rom: 'chưa có thông tin',
            microUSB: 'chưa có thông tin',
            battery: 'chưa có thông tin'
        },
        colors: []
    };
    
    const [product, setProduct] = useState(initialProductState);
  
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageUrl = e.target.result;
                setImageLink(imageUrl);
                setProduct((prev) => ({
                    ...prev,
                    image: imageUrl
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/product/create', product);
            if(response.data.status === "OK"){
                alert('Product added successfully!');
                setProduct(initialProductState);
                setImageLink('');
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <div className="product-container">
            <ProductGallery imageLink={imageLink} handleFileChange={handleFileChange} />
            <ProductForm product={product} setProduct={setProduct} handleSubmit={handleSubmit} />
            <ProductOptions colors={product.colors} setProduct={setProduct} />
            <ProductPromo product={product} setProduct={setProduct} />
        </div>
    );
}

export default AddProduct;
