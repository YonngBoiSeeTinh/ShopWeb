import React from 'react';

const ProductItem = () => {
  return (
    <div className="admin-product-item">
    
                <img src="{product.image}" alt="{product.name}" />
                <h3></h3>
                <span className="price">
                    <strong>₫</strong>
                   
                </span>      
                <span> đánh giá</span>
               
                 
                <div className="tooltip">
                    <button className="themvaogio">
                        <span className="tooltiptext">
                            Xoas
                        </span>
                        +
                    </button>
                </div>
            
        </div>
  );
};

export default ProductItem;
