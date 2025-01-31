import React from "react";
import ProductOptions  from './ProductOptions'
import ProductPrice  from './ProductPrice'
import PromoBox  from './PromoBox'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faBolt } from '@fortawesome/free-solid-svg-icons';

const ProductInfor =({ product ,handleColorClick,handleAddProduct,handleVersionClick,versions,priceVersion = 0})=>{
    const details = product?.detail || []
    return (
        <div className="product-info">
            <h1>{product.name}</h1>
             <div className="ratingresult" style={{marginLeft:"0"}}>
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <span>{product.rateCount} đánh giá</span>
                            </div>  
            {/* Chon mau */}
            <ProductOptions colors={product.colors} handleColorClick={handleColorClick} handleVersionClick ={handleVersionClick} versions = {versions}  /> 
            
            <div className="price-box">
                <div> 
                    <div className="price">{ priceVersion.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} </div>
                </div>    
            </div>
            <PromoBox handleAddProduct ={handleAddProduct} ></PromoBox>
            <div className="info_product">
            <h2>Thông số kỹ thuật</h2>
            <ul className="info">
                {details.map((item, index) => (
                    <li key={index}>
                        <p>{item.name}:</p>
                        <div> {item.value}</div>
                    </li>
                ))}
            </ul>
        </div>
            
        </div>
    );
}

export default ProductInfor