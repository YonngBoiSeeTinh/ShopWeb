import React from 'react';

function ProductGallery({ imageLink, handleFileChange }) {
    return (
        <section>
            <div className="product-detail">
                <div className="product-image">
                    <input type="file" id="fileInput" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                    <div className="product-gallery" onClick={() => document.getElementById('fileInput').click()}>
                        <img src={imageLink ? imageLink : "https://cdn-icons-png.flaticon.com/512/4211/4211763.png"} alt="Sản phẩm" className="main-image" />
                    </div>
                    <div className="thumbnail-gallery">
                        <img src={imageLink ? imageLink : ""} className="thumbnail" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProductGallery;
