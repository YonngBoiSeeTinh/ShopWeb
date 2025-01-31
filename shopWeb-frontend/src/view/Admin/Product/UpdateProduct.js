import React, { useState, useEffect } from "react";
import './Styles/ProductDetail.scss';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import ProductGallery from "./ProductComnonent/ProductGallery";
import ProductUpdateForm from "./ProductComnonent/ProductUpdateForm";

function UpdateProduct({setAlertMessage,setShowAlert, setType}) {
    const location = useLocation();
    const [imageLink, setImageLink] = useState('');
    const {id} = useParams()
   
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

  
    const fetchApi = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/product/getDetail/${id}`);
         
            return res.data.data; 
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    const query = useQuery({ queryKey: ['products'], queryFn: fetchApi });
    const queryData = query.data || [];

    const [product, setProduct] = useState({});
    const [subImageLink, setSubImage] = useState(product?.subImage );

    useEffect(() => {
        if (queryData) {
            setProduct(queryData);
            setSubImage(queryData.subImage || []);
        }
    }, [queryData]);

   
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
      // Hàm xử lý thay đổi file ảnh
      const handleSubImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageUrl = e.target.result;
                setSubImage((prev) => [
                    ...prev,
                    imageUrl
                ]);   
                    
            };
            reader.readAsDataURL(file);
        }
    };
 
    return (
        <div className="product_content">
            <div className="product_container">
            <ProductGallery img={product.image} imageLink={imageLink} handleFileChange={handleFileChange}
                 subImage={subImageLink|| []} handleSubImageChange={handleSubImageChange} setSubImage={setSubImage} />
            <ProductUpdateForm product={product} imageLink={imageLink} setProduct = {setProduct}
             setAlertMessage={setAlertMessage} setShowAlert={setShowAlert} setType={setType}
             subImage={subImageLink}/>
        </div>
        </div>
      
    );
}



export default UpdateProduct;
