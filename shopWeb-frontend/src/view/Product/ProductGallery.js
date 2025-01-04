import React,{useState} from "react";

const ProductGallery =({img,subImage})=>{
    const [image, setImage] = useState(img ||"");
    const handeClickSubImage =(e)=>{
        setImage(e);
    }
    return(
        <section>
        <div className="product-detail">
        <div className="product-image">
        <div className="product-gallery">      
            <img src={image?image:img} alt="Sản phẩm" className="main-image" />            
        </div>
            <div className="thumbnail-gallery">
                        {subImage.length > 0 ? (
                            subImage.map((thumbnail, index) => (
                                <img
                                    key={index}
                                    src={thumbnail || ""}
                                    alt="Sản phẩm nhỏ"
                                    className="thumbnail"
                                    onClick={() => handeClickSubImage(thumbnail)}
                                />
                            ))
                        ) : (
                            <img
                            src={ ""}
                            alt="Sản phẩm nhỏ"
                            className="thumbnail"
                            />
                        )}
            </div>
        </div>
        </div>
        
    </section>
          
    );
}

export default ProductGallery