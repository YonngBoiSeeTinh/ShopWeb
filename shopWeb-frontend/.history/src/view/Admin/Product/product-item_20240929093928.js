import React from 'react';

const ProductItem = () => {
  return (
    <div className="admin-product-item">
    
                <img src="" alt="{product.name}" className='product-img' />
                <h3>Iphone 15</h3>
                <div className="price">
                    15 000 000₫ 
                </div>      
                <span> đánh giá</span>
               
                <button className="delete">
                        Delete
                </button>   
      </div>
  );
};

export default ProductItem;
