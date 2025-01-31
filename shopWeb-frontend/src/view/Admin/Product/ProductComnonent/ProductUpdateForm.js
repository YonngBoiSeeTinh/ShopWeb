import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductOptions from './ProductOptions'; // Nhập component ProductOptions
import ProductDetailForm from './ProductDetailForm';
import { useQuery,useQueryClient  } from '@tanstack/react-query';


function ProductUpdateForm({ product,setProduct, imageLink,subImage, setAlertMessage,setShowAlert,setType }) {
    // Hàm xử lý thay đổi của input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    const [details, setDetails] = useState(  product?.detail  );
    useEffect(() => {
        if (product?.detail) {
            setDetails(product.detail);
        }
    }, [product]);
    // Hàm xử lý cập nhật sản phẩm
    const handleUpdate = async (e) => {
        e.preventDefault();
        const productCopy = { ...product };
        if (imageLink) {
            productCopy.image = imageLink; // Cập nhật link hình ảnh nếu có thay đổi
        }
        if (subImage) {
            productCopy.subImage = subImage; 
        }

        if(details){
            productCopy.detail = details;
        }
        delete productCopy._id;  // Xóa trường _id
        
        try {
            const response = axios.put(`http://localhost:3001/api/product/update/${product._id}`, productCopy);   
            console.log('response', response);
            if ((await response).statusText === 'OK') { 
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
            
        }
    };
    const fetchApiCategory = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/category/get`);
            return res.data.data; // Đảm bảo đây là một mảng
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };
  
    const queryCategory = useQuery({ queryKey: ['categories'], queryFn: fetchApiCategory });
    const listCategory = queryCategory.data || [];
   
    return (
        <form className="product-update-form" onSubmit={handleUpdate}>
            <div className="product-update-form_item">
                <div>Tên sản phẩm</div>
                <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    required
                      className='input'
                />
            </div>
            <div className="product-update-form_item">
            <div>Danh mục</div>
                <select
                    name="category"
                    onChange={handleChange}
                    className="input"
                    value={product.category || ''} // Đảm bảo luôn có giá trị
                >
                    <option value="" disabled>Chọn danh mục</option>
                    {listCategory.map((option, index) => (
                        <option key={index} value={option._id}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="product-update-form_item">
                <div>Giá</div>
                <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    required
                    className='input'
                />
            </div>
           
            <div>Màu</div>
            <ProductOptions colors={product.colors || []} setProduct = {setProduct}></ProductOptions>
            <div className="info_product promo">
                <h2>Khuyến mãi</h2>
                <ul  className="info">
                    <li>
                        <p>Giá trị:</p>
                        <input
                            type="number"
                            name="promo"
                            value={product.promo}
                            onChange={handleChange}
                            placeholder="Giá trị khuyến mãi"
                            className='input'
                        />
                    </li>
                </ul>              
            </div>
            <ProductDetailForm details = {details || []} setDetails={setDetails} product={product} setProduct={setProduct} />
           
            <button className="btnSubmit" type="submit">Cập nhật sản phẩm</button>
        </form>
    );
}

export default ProductUpdateForm;
