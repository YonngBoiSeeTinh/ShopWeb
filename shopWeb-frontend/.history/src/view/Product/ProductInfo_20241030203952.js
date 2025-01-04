import React from "react";
import ProductOptions  from './ProductOptions'
import ProductPrice  from './ProductPrice'
import PromoBox  from './PromoBox'

const ProductInfor =({ product ,handleColorClick,handleAddProduct})=>{
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
            <ProductPrice price= {product?.price
                                ? product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                                : 'Loading...'} 
                                oldPrice={product.promo?.oldPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) || ""}
                                value={product.promo?.value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} />

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

export default ProductInfor