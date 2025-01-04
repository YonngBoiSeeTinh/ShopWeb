import React from 'react';
import ProductOptions from './ProductOptions';
import ProductPromo from './ProductPromo';
import ProductDetailForm from './ProductDetailForm';
function ProductUpdateForm({ product, handleChange, handleSubmit, setProduct }) {
   
    const handlePromoChange = (e) => {
        const { name, value } = e.target;

        setProduct((prev) => ({
            ...prev,
            promo: {
                ...prev.promo,
                [name]: value // Cập nhật thông tin khuyến mãi
            }
        }));
    };
    return (
        <form className="product-update-form" onSubmit={handleSubmit}>
            <div className="product-update-form_item">
                <div>Tên sản phẩm</div>
                <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    required
                   
                />
            </div>
            <div className="product-update-form_item">
                <div>Công ty</div>
                <input
                    type="text"
                    name="company"
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="product-update-form_item">
                <div>Giá</div>
                <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    required
                />
            </div>
            <div style={{color:"white", marginBottom:"20px"}}>Màu</div>
            <ProductOptions colors={product.colors} setProduct={setProduct} />
            <ProductPromo handlePromoChange={handlePromoChange} />
            <ProductDetailForm setProduct={setProduct}/>
            <button type="submit" className='btnSubmit'>Thêm sản phẩm</button>
        </form>
    );
}

export default ProductUpdateForm;
