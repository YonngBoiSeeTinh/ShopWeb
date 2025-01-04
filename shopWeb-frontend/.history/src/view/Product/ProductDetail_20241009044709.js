import React from "react";
import './ProductDetail.css'; 
import { useEffect ,useState} from "react";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ProductGallery from "./ProductGallery";


function ProductDetail() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const [color, setColor] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        
    }, []);
    useEffect(() => {
        if (color) {
            console.log('Color updated:', color);
        }
    }, [color]);
    const { name } = useParams();
  
    const handleColorClick = (colorItem) =>{
        setColor(colorItem)
  
    }
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

    if (query.isLoading) {
        return <div>Loading...</div>;
    }
    if (query.isError) {
        return <div>Error fetching data: {query.error.message}</div>;
    }
    const product = query.data;
   
    if (!product) {
        return <div>Product not found.</div>;
    }
    const handleAddProduct= async()=>{
        if(!user.id){
           alert("Vui lòng đăng nhập")
        }
        if(!color) {
            alert("Vui lòng chọn màu ")
         }

        else if(color && color.countInstock <= 0){
            alert("Màu bạn chọn đã hết hàng, vui lòng chọn màu khác")
         }
         if(color &&  color.countInstock > 0 ){
            try {
                const cartItem = {
                    name: product.name,
                    image: product.image,
                    price: product.price,
                    totalPrice: product.price,
                    amount: 1, 
                    userId: user.id,
                    address: user.address, 
                    userName: user.name,
                    color: color?.color || product.colors[0] 
                };
                console.log(cartItem);
                const response = await axios.post('http://localhost:3001/api/cart/create', cartItem);
                alert(response.data.message); // Thông báo thành công
            } catch (error) {
                console.error('Lỗi khi thêm vào giỏ hàng:', error);
                alert('Có lỗi xảy ra khi thêm vào giỏ hàng');
            }
         }
       
    }

    return (
        <div className="product-container">
            <ProductGallery img={product.image} />
            <ProductInfo product={product} handleColorClick ={handleColorClick}  handleAddProduct={handleAddProduct}/>
        </div>
    );
    
}





export default ProductDetail;
