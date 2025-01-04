import React from 'react';
import './adminProduct.css'

import { Link } from 'react-router-dom';
const ProductItem = ({product}) => {
  return (
    <div className="admin-product-item">

                <img src={product.image} className='product-img'/>
                <h4 className="pro-name">{product.name}</h4>
                <div className="pro-price">
                   {product.price}
                </div>      
                <div> {product.rateCount} đánh giá</div>
                <div className='product-action'>
                      <Link>
                          <div className='produt-action_item'>
                            Update
                          </div>
                      </Link>

                      <Link to="#">
                          <div className='produt-action_item'>
                            Delete
                          </div>
                      </Link> 
                 
                </div>  
                
      </div>
  );
};

export default ProductItem;
