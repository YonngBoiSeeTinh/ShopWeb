import React from "react";

const ProductPrice =({ price, oldPrice})=>{
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

export default ProductPrice