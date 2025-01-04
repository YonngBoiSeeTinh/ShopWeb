import React, { useState } from 'react';

function ProductGallery({ img, imageLink, handleFileChange, subImage,handleSubImageChange }) {
    const [image, setImage] = useState(imageLink);
    const handeClickSubImage =(e)=>{
        setImage(e);
    }
    return (
        
        <section>
            <div className="product-detail">
                <div className="product-image">
                    <input type="file" id="fileInput" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                    <div className="product-gallery" onClick={() => document.getElementById('fileInput').click()}>
                        <img src={imageLink ? imageLink : image ?image:img} alt="Sản phẩm" className="main-image" />
                    </div>
                    <div className="thumbnail-gallery">
                        {subImage.map((image, index) => (
                            <img 
                                key={index} 
                                src={image || ""} 
                                alt="Sản phẩm nhỏ" 
                                className="thumbnail" 
                                onClick={()=>handeClickSubImage(image)}
                            />
                        ))}
                         <input type="file" id="subInput" accept="image/*" onChange={handleSubImageChange} style={{ display: 'none' }} />
                          <img src='/addicon.jpg' alt="Sản phẩm nhỏ" className="thumbnail" 
                          onClick={() => document.getElementById('subInput').click()}
                          />
                     
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProductGallery;
