import React from 'react';
import './adminProduct.css'
const ProductItem = ({product}) => {
  return (
    <div className="admin-product-item">

                <img src={product.image} className='product-img'/>
                <h4 className="pro-name">{product.name}</h4>
                <div className="pro-price">
                   {product.price}
                </div>      
                <div> {product.rateCount} đánh giá</div>
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
