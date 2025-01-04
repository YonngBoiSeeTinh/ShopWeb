import React, { useState, useEffect } from "react";
import './ProductDetail.scss'; // Đảm bảo bạn đã tạo và liên kết file CSS
import axios from 'axios';
import ProductGallery from "./ProductComnonent/AddProduct/ProductGallery";
import ProductAddForm from "./ProductComnonent/AddProduct/ProductAddForm";

function AddProduct({setAlertMessage,setShowAlert, setType}) {
    const [imageLink, setImageLink] = useState('');
    const initialProductState = {
        name: '',
        category: '',
        image: '',
        subImage:[],
        price: Number('0'),
        rating: Number('5'),
        rateCount: Number('0'),
        description: '',
        promo:Number('0'),
        detail: [],
        colors: []
    };
    
    // Trong useState
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
                    image: imageUrl // Cập nhật đường dẫn hình ảnh vào sản phẩm
                }));
            };
            reader.readAsDataURL(file);
        }
    };



    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: value
        }));
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/product/create', product);
            console.log(response.data);
            if(response.data.status === "OK"){
                setAlertMessage("Thêm sản phẩm thành công");
                setType("success");
                setShowAlert(true);
                setProduct(initialProductState); // Reset form after submission
                setImageLink(''); // Reset image link
            }
           
        } catch (error) {
            if (error.response) {
                // Lỗi do server trả về
                setAlertMessage(error.response.data.message || error.message);
                setShowAlert(true);
                setType("warning");
            } 
            console.error("There was an error adding the product!", error);
        }
    };

    return (
        <div className="product_content">
            <div className="product_container">
                <ProductGallery imageLink={imageLink} handleFileChange={handleFileChange} />
                <ProductAddForm product={product} handleChange={handleChange} handleSubmit={handleSubmit} setProduct={setProduct} />
            </div>
        </div>
    );
}



export default AddProduct;
