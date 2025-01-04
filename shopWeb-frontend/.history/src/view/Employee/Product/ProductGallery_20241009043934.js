import React from "react";

const ProductGallery =({img})=>{
    return(
        <section>
        <div className="produc-detail">
        <div className="product-image">
        <div className="product-gallery">      
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