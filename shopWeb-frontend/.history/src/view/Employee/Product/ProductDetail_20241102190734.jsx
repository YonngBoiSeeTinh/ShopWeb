import React from 'react';
import ProductDetail from '../../Product/ProductDetail';
import './ProductDetail.scss' 
const ProductDetailPage = ({setAlertMessage,setShowAlert, setType}) => {
 
    return (
      <div className="employee-product-container">
         <ProductDetail />   
      </div>
    );
  };

export default ProductDetailPage;
