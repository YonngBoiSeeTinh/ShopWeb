import React from 'react';
import './adminProduct.css'
import ProductItem from './product-item'
import AddProduct from './AddProduct';
import { Link } from 'react-router-dom';
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
    <Link to="/admin/addProduct" className='btnAdd'>
        <div >
          Them san pham
        </div>
    </Link>
     
      {/* <AddProduct></AddProduct> */}
    </div>
  );
};

export default ProductsPage;
