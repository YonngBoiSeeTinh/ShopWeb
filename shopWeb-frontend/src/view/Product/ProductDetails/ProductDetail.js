import React from "react";
import '../style/ProductDetail.scss'; 
import { useEffect ,useState} from "react";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProductGallery from "./ProductGallery";
import ProductInfor from "./ProductInfo";
import ProductComment from "./ProductComment";
function ProductDetail({setAlertMessage,setShowAlert, setType,setUpdateCart}) {
  
    
    const user = useSelector((state) => state.user);
    
    const [color, setColor] = useState(null); // Trạng thái 
    const [versions , setVersions] = useState(null);
    const [version , setVersion] = useState(null);
   
    useEffect(() => {
        window.scrollTo(0, 0);
        
    }, []);
 
    const { name } = useParams(); // lấy name từ url
  
    const handleColorClick = (colorItem) =>{
        setColor(colorItem)
        setVersions(colorItem?.version)
  
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
  
    //lấy sản phẩm từ data
      const query = useQuery({
        queryKey: ['products', name],
        queryFn: fetchApi
    });
    const product = query.data;
    
    const [priceVersion , setPrice] = useState(product?.price);
    useEffect(() => {
        setPrice(product?.price)
    }, [product]);
    const handleVersionClick = (version) =>{
        setVersion(version)
        setPrice(version?.price)
        console.log('version:',version?.name,version?.price );
    }
    if (query.isLoading) {
        return <div>Loading...</div>;
    }
    if (query.isError) {
        return <div>Error fetching data: {query.error.message}</div>;
    }
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
         else if(!version) {
            setAlertMessage("Vui lòng chọn phiên bản");
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
        else if(version && version.countInstock <= 0){
            setAlertMessage("Màu bạn chọn đã hết hàng, vui lòng chọn màu khác");
            setType("warning");
            setShowAlert(true);
            return;
         }
        
         if(version && version.countInstock > 0 ){
            try {
                const cartItem = {
                    name: product.name,
                    image: product.image,
                    price: priceVersion,
                    totalPrice: priceVersion,
                    amount: 1, 
                    userId: user.id,
                    productId: product._id,
                    address: user.address, 
                    userName: user.name,
                    color: color?.color || product.colors[0] ,
                    version: version? version?.name : ""
                };
               // gọi api thêm giỏ hàng
                const response = await axios.post('http://localhost:3001/api/cart/create', cartItem);
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
        <div>
             <div className="product-container">
                <ProductGallery img={product.image} subImage={product?.subImage}/>
                <ProductInfor product={product} handleColorClick ={handleColorClick} versions = {versions}
                            handleAddProduct={handleAddProduct} handleVersionClick = {handleVersionClick}
                            priceVersion ={priceVersion}
                            />
                
            </div>
            <ProductComment/>
        </div>
       
    );
    
}



export default ProductDetail;
