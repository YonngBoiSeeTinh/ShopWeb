import React, { useState, useEffect } from "react";
import './Styles/ProductDetail.scss'; 
import axios from 'axios';
import ProductGallery from "./ProductComnonent/ProductGallery";
import ProductAddForm from "./ProductComnonent/ProductAddForm";

function AddProduct({setAlertMessage,setShowAlert, setType}) {
    const [imageLink, setImageLink] = useState('');
    const initialProductState = {
        name: '',
        category: '',
        image: '',
        subImage:[],
        price: Number('0'),
        rateCount:Number('0'),
        rateStart:Number('0'),
        sellCount:Number('0'),
        rating: Number('5'),
        description: '',
        promo:Number('0'),
        detail:  [{ name: "Loại sản phẩm", value: "" },
                  { name: "Hệ điều hành", value: "" },
                  { name: "Màn hình", value: "" },
                  { name: "Pin", value: "" },
                  { name: "Ram", value: "" },
                  { name: "Rom", value: "" },],
        colors: []
    };
    
    // Trong useState
    const [product, setProduct] = useState(initialProductState);
    const [subImageLink, setSubImage] = useState(product.subImage);
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
            console.log("Add product :",response.data);
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
    const handleSubImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageUrl = e.target.result;
    
                setSubImage((prev) => {
                    const updatedSubImages = [...prev, imageUrl];
                    // Cập nhật cả `product.subImage`
                    setProduct((productPrev) => ({
                        ...productPrev,
                        subImage: updatedSubImages,
                    }));
                    return updatedSubImages;
                });
            };
            reader.readAsDataURL(file);
        }
    };
    

    return (
        <div className="product_content">
            <div className="product_container">
                <ProductGallery img={product.image} imageLink={imageLink} handleFileChange={handleFileChange} subImage={subImageLink || []} handleSubImageChange={handleSubImageChange}/>
                <ProductAddForm product={product} handleChange={handleChange} handleSubmit={handleSubmit} setProduct={setProduct}  subImage={subImageLink || []} handleSubImageChange={handleSubImageChange} />
            </div>
        </div>
    );
}



export default AddProduct;
