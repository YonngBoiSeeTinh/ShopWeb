import React from 'react';
import './adminProduct.css'
import ProductItem from './product-item'
import AddProduct from './AddProduct';
const ProductsPage = () => {
  return (
    <div className="admin-product-container">

      <div className="admin-product-list">
        <ProductItem></ProductItem>
        <ProductItem></ProductItem>
        <ProductItem></ProductItem>
        <ProductItem></ProductItem>
        <ProductItem></ProductItem>
        <ProductItem></ProductItem>
        <ProductItem></ProductItem>
        <ProductItem></ProductItem>
        <ProductItem></ProductItem>
      </div>
      {/* <AddProduct></AddProduct> */}
    </div>
  );
};

export default ProductsPage;
