import React from 'react';
import ProductDetail from '../../Product/ProductDetail';
import './ProductDetail.scss' 
const ProductDetailPage = ({setAlertMessage,setShowAlert, setType}) => {
 
    return (
      <div className="employee-product-detail">
         <ProductDetail  setAlertMessage={setAlertMessage} setShowAlert={setShowAlert}  setType={setType}/>   
      </div>
    );
  };

export default ProductDetailPage;
