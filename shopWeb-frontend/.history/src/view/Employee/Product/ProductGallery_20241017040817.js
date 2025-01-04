import React from "react";

const ProductGallery =({img})=>{
    return(
        <section>
        <div className="emoloyee_product-detail">
            <div className="emoloyee_productt-image">
                <div className="emoloyee_productt-gallery">      
                    <img src={img} alt="Sản phẩm" className="main-image" />            
                </div>
                    <div className="thumbnail-gallery">
                        <img src={img} alt="Sản phẩm nhỏ" className="thumbnail" />
                        <img src={img} alt="Sản phẩm nhỏ" className="thumbnail" />
                        <img src={img} alt="Sản phẩm nhỏ" className="thumbnail" />
                        <img src={img} alt="Sản phẩm nhỏ" className="thumbnail" />
                        <img src={img} alt="Sản phẩm nhỏ" className="thumbnail" />
                        <img src={img} alt="Sản phẩm nhỏ" className="thumbnail" />
                        <img src={img} alt="Sản phẩm nhỏ" className="thumbnail" />
                    </div>
                </div>
        </div>
        
    </section>
          
    );
}

export default ProductGallery