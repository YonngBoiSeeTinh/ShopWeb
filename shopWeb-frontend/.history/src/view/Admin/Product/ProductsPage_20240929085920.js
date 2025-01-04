import React from 'react';
import './adminProduct.css'
import ProductItem from './product-item'
const ProductsPage = () => {
  return (
    <div className="admin-product-container">
      <div className="admin-product-list">
        <ProductItem></ProductItem>
      </div>
        
    </div>
  );
};

export default ProductsPage;
