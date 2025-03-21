import React from "react";
import './ProductDetail.css'; 
import { useEffect ,useState} from "react";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProductGallery from "./ProductGallery";
import ProductInfor from "./ProductInfo";
function ProductDetail({setAlertMessage,setShowAlert, setType,setUpdateCart}) {
  
    
    const user = useSelector((state) => state.user);
    
    const [color, setColor] = useState(null); // Trạng thái 
    useEffect(() => {
        window.scrollTo(0, 0);
        
    }, []);
 
    const { name } = useParams(); // lấy name từ url
  
    const handleColorClick = (colorItem) =>{
        setColor(colorItem)
  
    }
    // hàm gọi api
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
    //chạy api
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
    //lấy sản phẩm từ data
    const product = query.data;
   
    if (!product) {
        return <div>Product not found.</div>;
    }
    //Hàm thêm vào giở hàng
    const handleAddProduct= async()=>{ // đợi api chạy xong (*bất đồng bộ)
        if(!user.id ){
            setAlertMessage("Vui lòng đăng nhập");
            setType("warning");
            setShowAlert(true);
            return;
        }
      
        else if(!color) {
            setAlertMessage("Vui lòng chọn màu");
            setType("warning");
            setShowAlert(true);
            return;
         }
         else if(!user.address) {
            setAlertMessage("Vui lòng nhập địa chỉ của bạn ở trang cá nhân");
            setType("warning");
            setShowAlert(true);
            return;
         }
        else if(color && color.countInstock <= 0){
            setAlertMessage("Màu bạn chọn đã hết hàng, vui lòng chọn màu khác");
            setType("warning");
            setShowAlert(true);
            return;
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
                    productId: product._id,
                    address: user.address, 
                    userName: user.name,
                   
                    color: color?.color || product.colors[0] 
                };
               // gọi api thêm giỏ hàng
                const response = await axios.post('http://localhost:3001/api/cart/create', cartItem);
                 if(response.data.message === "Cart updated successfully"){
                    console.log(response.data.message);
                    setUpdateCart(true)
                    console.log('update',cartItem.name);
                   
                 }
                setAlertMessage("Thêm vào giỏ hàng thành công");
                setType("success");
                setShowAlert(true);
                
            } catch (error) {
                setAlertMessage(error);
                setType("warning");
                setShowAlert(true);
                
            }
         }
       
    }

    return (
        <div className="product-container">
            <ProductGallery img={product.image} />
            <ProductInfor product={product} handleColorClick ={handleColorClick}
                          handleAddProduct={handleAddProduct}
                          />
            
        </div>
    );
    
}



export default ProductDetail;
