import React from 'react';
import './adminProduct.css'

import { Link } from 'react-router-dom';
const ProductItem = ({product, productid}) => {

    const handleDelete = async () => {

        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
        console.log('productid', productid);
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:3001/api/product/delete/${productid}`, {
                    method: 'DELETE',
                });
                const data = await response.json();
                if (response.ok) {
                    // Xóa sản phẩm thành công, cập nhật state
                    alert("Sản phẩm đã được xóa thành công!");
                } else {
                    alert(data.message || "Có lỗi xảy ra khi xóa sản phẩm.");
                }
            } catch (error) {
                console.error('Error deleting product:', error);
                alert("Có lỗi xảy ra, vui lòng thử lại.");
            }
        }
    };
    return (
    <div className="admin-product-item">

                <img src={product.image} className='product-img'/>
                <h4 className="pro-name">{product.name}</h4>
                <div className="pro-price">
                   {product.price}
                </div>      
                <div> {product.rateCount} đánh giá</div>
                <div className='product-action'>
                      <Link to ={`/admin/adminProductDetail/${product.name}`}>
                          <div className='produt-action_item'>
                            Update
                          </div>
                      </Link>

                      <Link to="#">
                          <div className='produt-action_item delete' onClick={handleDelete}>
                            Delete
                          </div>
                      </Link> 
                 
                </div>  
                
      </div>
  );
};

export default ProductItem;
