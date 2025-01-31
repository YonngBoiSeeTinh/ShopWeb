import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faBolt } from '@fortawesome/free-solid-svg-icons';

function ProductItem({ product }) {
    // hiển thị tên khuyến mãi
    const renderPromoLabel = () => {
        
        if (product?.promo > 0) {
            return (
                <>
                    <FontAwesomeIcon icon={faBolt} /> Giảm {product.promo ?
                      product.promo.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                    : 'Loading...'
                    }
                </>
            );
        } 
    };

    const renderOldPrice = () => {
        if (product.promo?.name === "giamgia") {
            return <>{product.promo?.oldPrice ?
                      product.promo?.oldPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                    : 'Loading...'
                    }
             </>;
        }
        return null;
    };

    return (
        <div className="product_item">    
             <Link to={`/product/${product.name}`} className="product-link">
                <label className={product.promo?.name}>
                    {renderPromoLabel()}
                </label>

                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <span className="price">
                    <strong>
                    {product?.price
                    ? product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                    : 'Loading...'} 
                    </strong>
                    <span>{renderOldPrice()}</span>
                </span>

                <div className="ratingresult">
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <span>{product.rateCount} đánh giá</span>
                </div>  
                </Link>        
               
            
        </div>
    );
}

export default ProductItem;
