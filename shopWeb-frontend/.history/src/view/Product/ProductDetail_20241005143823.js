import React from "react";
import './ProductDetail.css'; 
import { useEffect ,useState} from "react";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';




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
          setColor(product.colors[0])
         }
         
        if(color.countInstock < 0){
            alert("Màu bạn chọn đã hết hàng, vui lòng chọn màu khác")
         }
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
                color: color?.color || 'Màu mặc định' // Lấy màu người dùng chọn
            };
            console.log(cartItem);
            const response = await axios.post('http://localhost:3001/api/cart/create', cartItem);
            alert(response.data.message); // Thông báo thành công
        } catch (error) {
            console.error('Lỗi khi thêm vào giỏ hàng:', error);
            alert('Có lỗi xảy ra khi thêm vào giỏ hàng');
        }
    }

    return (
        <div className="product-container">
            <ProductGallery img={product.image} />
            <ProductInfo product={product} handleColorClick ={handleColorClick}  handleAddProduct={handleAddProduct}/>
        </div>
    );
    
}

function ProductGallery({ img }) {
    return (
        <section>
            <div className="produc-detail">
            <div className="product-image">
            <div className="product-gallery">      
                <img src={img} alt="Sản phẩm" className="main-image" />            
            </div>
                <div className="thumbnail-gallery">
                    <img src={img} alt="Sản phẩm nhỏ" className="thumbnail" />
                    <img src={img} alt="Sản phẩm nhỏ" className="thumbnail" />
                    <img src={img} alt="Sản phẩm nhỏ" className="thumbnail" />
                    <img src={img} alt="Sản phẩm nhỏ" className="thumbnail" />
                    <img src={img} alt="Sản phẩm nhỏ" className="thumbnail" />
                    <img src={img} alt="Sản phẩm nhỏ" className="thumbnail" />
                    <img src={img} alt="Sản phẩm nhỏ" className="thumbnail" />
                </div>
            </div>
            </div>
            
        </section>
              
    );
}

function ProductInfo({ product ,handleColorClick,handleAddProduct}) {
    const details = [
        { key: "Màn hình", value: product.detail?.screen || "Không có thông tin" },
        { key: "Hệ điều hành", value: product.detail?.os || "Không có thông tin" },
        { key: "Camera sau", value: product.detail?.camera|| "Không có thông tin" },
        { key: "Camera trước", value: product.detail?.cameraFront || "Không có thông tin" },
        { key: "CPU", value: product.detail?.cpu || "Không có thông tin" },
        { key: "RAM", value: product.detail?.ram || "Không có thông tin" },
        { key: "ROM", value: product.detail?.rom || "Không có thông tin" },
        { key: "MicroSD", value: product.detail?.microUSB || "Không có thông tin" },
        { key: "Pin", value: product.detail?.battery || "Không có thông tin" },
    ];
    
    return (
        <div className="product-info">
            <h1>{product.name}</h1>
            <p>Giá và khuyến mãi tại: <span className="location">Hồ Chí Minh</span></p>
            <ProductOptions colors={product.colors} handleColorClick={handleColorClick} />
            <ProductPrice price={product.price} oldPrice={product.promo?.oldPrice} value={product.promo?.value} />

            <PromoBox handleAddProduct ={handleAddProduct}></PromoBox>
            <div className="info_product">
            <h2>Thông số kỹ thuật</h2>
            <ul className="info">
                {details.map((item, index) => (
                    <li key={index}>
                        <p>{item.key}:</p>
                        <div> {item.value}</div>
                    </li>
                ))}
            </ul>
        </div>
            
        </div>
    );
}

function ProductOptions({colors,handleColorClick}) {
    const [selectedColor, setSelectedColor] = useState(null);

    const handleColorSelect = (colorItem) => {
        setSelectedColor(colorItem.color);  // Cập nhật màu đã chọn
        handleColorClick(colorItem);        // Gọi hàm từ parent component để xử lý thêm
    };
    return (
        <div className="options">
            <label>Dung lượng</label>
            <div className="capacity-options">
                <button className="capacity active">128GB</button>
            </div>
            <label>Màu</label>
          
            <div className="color-options ">
                {colors.map((colorItem, index) => (
                    <button 
                        key={index} 
                        className={`color ${colorItem.color.toLowerCase()} ${selectedColor === colorItem.color ? 'active' : ''}`} 
                        style={{ backgroundColor: colorItem.code }} // Đặt màu cho background
                        title={colorItem.color}
                        onClick={() => handleColorSelect(colorItem)}
                      
                    >
                    </button>
                ))}
            </div>
        </div>
    );
}

function ProductPrice({ price, oldPrice, value }) {
    return (
        <div className="price-box">
            <div><div className="price">{price}₫</div>
            {oldPrice && <div className="old-price">{oldPrice}₫ </div>}</div>    
            <div className="end-time">
               Kết thúc vào 23:59 | 30/09
            </div>
        </div>
        
    );
}

function PromoBox({handleAddProduct}) {
    return (
        <div className="promo-box">
        <p>Online Giá Rẻ Quá</p>
        <div className="area_order">
        <div className="policy">
                    <div>
                        <img src="img/chitietsanpham/box.png"/>
                        <p>Trong hộp có: Sạc, Tai nghe, Sách hướng dẫn, Cây lấy sim, Ốp lưng </p>
                    </div>
                    <div>
                        <img src="img/chitietsanpham/icon-baohanh.png"/>
                        <p>Bảo hành chính hãng 12 tháng.</p>
                    </div>
                    <div className="last">
                        <img src="img/chitietsanpham/1-1.jpg"/>
                        <p>1 đổi 1 trong 1 tháng nếu lỗi, đổi sản phẩm tại nhà trong 1 ngày.</p>
                    </div>
                </div>
                <a className="buy_now" onClick={handleAddProduct} >
                        <b><i className="fa fa-cart-plus"></i> Thêm vào giỏ hàng</b>
                        <p>Giao trong 1 giờ hoặc nhận tại cửa hàng</p>
                 </a>
                </div>
        </div>
    );
}

export default ProductDetail;
