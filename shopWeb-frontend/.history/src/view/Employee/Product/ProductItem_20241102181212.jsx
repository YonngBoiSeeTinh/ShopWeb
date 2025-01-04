import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faBolt } from '@fortawesome/free-solid-svg-icons';

function ProductItem({ product }) {
    
    const renderPromoLabel = () => {
        const promoName = product.promo?.name; 
        if (promoName === "giamgia") {
            return (
                <>
                    <FontAwesomeIcon icon={faBolt} /> Giảm {product.promo?.value} đ
                </>
            );
        } else if (promoName === "moi") {
            return <>Mới ra mắt</>;
        } else if (promoName === "tragop") {
            return <>Trả góp 0%</>;
        } else {
            return null; // Không có khuyến mãi
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
                    <strong>{product?.price
                    ? product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                    : 'Loading...'}</strong>
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
