import React from "react";
import './ProductDetail.css'; // Đảm bảo bạn đã tạo và liên kết file CSS
import { useEffect } from "react";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

function ProductDetail() {
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const { name } = useParams();

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

    // Kiểm tra trạng thái loading và error
    if (query.isLoading) {
        return <div>Loading...</div>;
    }

    if (query.isError) {
        return <div>Error fetching data: {query.error.message}</div>;
    }

    const product = query.data;

    // Kiểm tra xem product có tồn tại không
    if (!product) {
        return <div>Product not found.</div>;
    }

    return (
        <div className="product-container">
            <ProductGallery img={product.image} />
            <ProductInfo product={product} />
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

function ProductInfo({ product }) {
    const details = [
        { key: "Màn hình", value: product.detail?.screen || "Không có thông tin" },
        { key: "Hệ điều hành", value: product.detail?.os || "Không có thông tin" },
        { key: "Camera sau", value: product.detail?.camara || "Không có thông tin" },
        { key: "Camera trước", value: product.detail?.camaraFront || "Không có thông tin" },
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
            <ProductOptions />
            <ProductPrice price={product.price} oldPrice={product.promo?.oldPrice} />

            <PromoBox></PromoBox>
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


function ProductOptions() {
    return (
        <div className="options">
            <label>Dung lượng</label>
            <div className="capacity-options">
                <button className="capacity active">128GB</button>
            </div>
            <label>Màu</label>
            <div className="color-options">
                <button className="color active blue"></button>
                <button className="color white"></button>
                <button className="color black"></button>
                <button className="color pink"></button>
            </div>
        </div>
    );
}

function ProductPrice({ price, oldPrice }) {
    return (
        <div className="price-box">
            <div><div className="price">{price}₫</div>
            {oldPrice && <div className="old-price">{oldPrice}₫ (-17%)</div>}</div>    
            <div className="end-time">
               Kết thúc vào 23:59 | 30/09
            </div>
        </div>
        
    );
}

function PromoBox() {
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
                <a className="buy_now" >
                        <b><i className="fa fa-cart-plus"></i> Thêm vào giỏ hàng</b>
                        <p>Giao trong 1 giờ hoặc nhận tại cửa hàng</p>
                 </a>
                </div>
        </div>
    );
}

export default ProductDetail;
