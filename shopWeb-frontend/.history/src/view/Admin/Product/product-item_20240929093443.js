import React from 'react';

const ProductItem = () => {
  return (
    <div className="admin-product-item">
    
                <img src="{product.image}" alt="{product.name}" />
                <h3>Iphone 15</h3>
                <span className="price">
                    <strong>₫</strong>
                   
                </span>      
                <span> đánh giá</span>
               
                <button className="delete">
                        Delete
                </button>   
      </div>
  );
};

export default ProductItem;
