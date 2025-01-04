import React, { useState } from 'react';
import axios from 'axios';
import ProductOptions from './ProductOptions'; // Nhập component ProductOptions
import ProductDetailForm from '../UpdateProduct/ProductDetailsForm';
import ProductPromo from './ProductPromo';


function ProductUpdateForm({ product, imageLink,
                            setAlertMessage,setShowAlert, setType
                            }) {

    const [updatedProduct, setUpdatedProduct] = useState({ ...product });

    // Hàm xử lý thay đổi của input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Hàm xử lý cập nhật sản phẩm
    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedProductCopy = { ...updatedProduct };
        if (imageLink) {
            updatedProductCopy.image = imageLink; // Cập nhật link hình ảnh nếu có thay đổi
        }

        delete updatedProductCopy._id;  // Xóa trường _id
        
        try {
            const response = axios.put(`http://localhost:3001/api/product/update/${product._id}`, updatedProductCopy);   
            console.log(response);
            if (response.data.status === 'OK') { 
                setAlertMessage("Cập nhật sản phẩm thành công");
                setType("success");
                setShowAlert(true);}
            else{
                setAlertMessage(response.data.message);
                setShowAlert(true);
                setType("warning");
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setAlertMessage(err.response.data.message);  
            } 
            setType("warning");
            setShowAlert(true);
            console.error("Error updating product:", err);
        }
    };
 
    return (
        <form className="product-update-form" onSubmit={handleUpdate}>
            <div className="product-update-form_item">
                <div>Tên sản phẩm</div>
                <input
                    type="text"
                    name="name"
                    value={updatedProduct.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="product-update-form_item">
                <div>Công ty</div>
                <input
                    type="text"
                    name="company"
                    value={updatedProduct.company}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="product-update-form_item">
                <div>Giá</div>
                <input
                    type="number"
                    name="price"
                    value={updatedProduct.price}
                    onChange={handleChange}
                    required
                />
            </div>
           
            <div>Màu</div>
            <ProductOptions colors={updatedProduct.colors} setUpdatedProduct = {setUpdatedProduct}></ProductOptions>
            <ProductPromo updatedProduct={updatedProduct} setUpdatedProduct={setUpdatedProduct}></ProductPromo>
            <ProductDetailForm updateProduct={updatedProduct} setUpdatedProduct={setUpdatedProduct} />
           
            <button className="btnSubmit" type="submit">Cập nhật sản phẩm</button>
        </form>
    );
}

export default ProductUpdateForm;
