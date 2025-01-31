import React, { useState } from 'react';

function ProductGallery({ img, imageLink, handleFileChange, subImage,handleSubImageChange,setSubImage }) {
    const [image, setImage] = useState(imageLink);
    const handeClickSubImage =(e)=>{
        setImage(e);
    }
    // const handelDeleteSubImage =(e)=>{
    //     setSubImage((prev) => prev.filter((image) => image !== e));
    // }
    const handleDeleteSubImage = (indexToDelete) => {
        setSubImage((prev) => prev.filter((_, index) => index !== indexToDelete));
    };
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
                            <div className='thumbnail-gallery_item' >
                                <button className='tbnDelSubImg' onClick={()=>handleDeleteSubImage(index)  }>X</button>
                                <img 
                                    key={index} 
                                    src={image || ""} 
                                    alt="Sản phẩm nhỏ" 
                                    onClick={()=>handeClickSubImage(image)}
                                />
                            </div>
                            
                        ))}
                         <input type="file" id="subInput" accept="image/*" onChange={handleSubImageChange} style={{ display: 'none' }} />
                          <img src='/addicon.jpg' alt="Sản phẩm nhỏ" className="thumbnail-gallery_item" 
                                onClick={() => document.getElementById('subInput').click()}
                                style={{marginTop:"5px"}}
                          />
                     
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProductGallery;
