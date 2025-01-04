import React from 'react';

const ProductItem = () => {
  return (
    <div className="admin-product-item">
    
                <img src="" alt="" className='product-img' />
                <h3>Iphone 15</h3>
                <div className="pro-price">
                    15 000 000₫ 
                </div>      
                <div> 0 đánh giá</div>
               
                <button className="delete">
                        Delete
                </button>   
      </div>
  );
};

export default ProductItem;
