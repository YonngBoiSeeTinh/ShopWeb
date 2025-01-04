import React from 'react';

const ProductItem = () => {
  return (
    <div className="admin-product-item">
    
                <img src="https://cdn2.fptshop.com.vn/unsafe/256x0/filters:quality(100)/2023_9_15_638303935769505085_iphone-15-xanh-1.jpg" alt="" className='product-img' />
                <h3>Iphone 15</h3>
                <div className="pro-price">
                    15 000 000₫ 
                </div>      
                <div> 0 đánh giá</div>
                <div className='produt-action'>
                <button className="produt-action_item update">
                          Update
                  </button> 
                  <button className="produt-action_item delete">
                          Delete
                  </button>  
                 
                </div>  
                
      </div>
  );
};

export default ProductItem;
