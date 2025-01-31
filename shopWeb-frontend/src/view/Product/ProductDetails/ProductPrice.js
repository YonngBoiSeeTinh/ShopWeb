import React from "react";

const ProductPrice =({ price})=>{
    return (
        <div className="price-box">
            <div> 
                <div className="price">{price
                    ? price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                    : 'Loading...'} </div>
            </div>    
        </div>
        
    );
}

export default ProductPrice