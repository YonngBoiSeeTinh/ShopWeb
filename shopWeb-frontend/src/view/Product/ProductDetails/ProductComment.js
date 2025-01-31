import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faBolt } from '@fortawesome/free-solid-svg-icons';
const ProductComment =({ })=>{
    return (
        <div className="commnet-box">
            <h2>Đánh giá sản phẩm</h2>
            <div className="rate-box">
                <p>5 </p> <label>trên 5</label>
             <div className="ratingresult" style={{marginLeft:"0"}}>
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />

            </div>  
            </div>
            <div className="commnet_content">
                <div className="user">
                    <img src="" />
                    <div className="name">
                        Khach hang
                    </div>
                </div>
                <div className="version">27/01/2024 | Phiên bản: Đen, 256GB</div>
                 <div className="ratingresult" style={{marginLeft:"0"}}>
                                                <FontAwesomeIcon icon={faStar} />
                                                <FontAwesomeIcon icon={faStar} />
                                                <FontAwesomeIcon icon={faStar} />
                                                <FontAwesomeIcon icon={faStar} />
                                                <FontAwesomeIcon icon={faStar} />
                    
                                            </div>  
                <div className="comment_des" >
                   Sản phẩm tuyệt cà là vời
                </div>
            </div>
        </div>
        
    );
}

export default ProductComment