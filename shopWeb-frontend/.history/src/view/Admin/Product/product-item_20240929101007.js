import React from 'react';

const ProductItem = (product) => {
  return (
    <div className="admin-product-item">

                <img src={product.image} />
                <h3>{product.name}</h3>
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
