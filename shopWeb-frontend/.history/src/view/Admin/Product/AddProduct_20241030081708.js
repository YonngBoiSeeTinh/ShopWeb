import React, { useState, useEffect } from "react";
import './ProductDetail.scss'; // Đảm bảo bạn đã tạo và liên kết file CSS
import axios from 'axios';
import ProductGallery from "./ProductComnonent/AddProduct/ProductGallery";
import ProductUpdateForm from "./ProductComnonent/AddProduct/ProductAddForm";

function AddPeoduct() {
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
                console.log('Product added successfully:', response.data);
                alert('Product added successfully!');
                setProduct(initialProductState); // Reset form after submission
                setImageLink(''); // Reset image link
            }
           
        } catch (error) {
            if (error.response) {
                // Lỗi do server trả về
                alert(`Error: ${error.response.data.message || error.message}`);
            } else if (error.request) {
                // Không nhận được phản hồi từ server
                alert("Error: No response received from the server.");
            } else {
                // Lỗi khác
                alert(`Error: ${error.message}`);
            }
            console.error("There was an error adding the product!", error);
        }
    };

    return (
        <div className="product_container">
            <ProductGallery imageLink={imageLink} handleFileChange={handleFileChange} />
            <ProductUpdateForm product={product} handleChange={handleChange} handleSubmit={handleSubmit} setProduct={setProduct} />
        </div>
    );
}



export default AddPeoduct;
