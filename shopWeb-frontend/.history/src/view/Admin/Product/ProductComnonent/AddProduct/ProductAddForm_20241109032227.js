import React from 'react';
import ProductOptions from './ProductOptions';
import ProductPromo from './ProductPromo';
import ProductDetailForm from './ProductDetailForm';
function ProductAddForm({ product, handleChange, handleSubmit, setProduct }) {
   
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
    const companyOption = ['Apple', 'Samsung', 'Oppo', 'Xiaomi', 'Headphone', 'Accessories'];
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
                      className='input'
                   
                />
            </div>
            <div className="product-update-form_item">
                <div>Loại, Hãng</div>
                <select
                    name="company"
                    onChange={handleChange}
                    className='input'
                >
                    {companyOption.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
            <div className="product-update-form_item">
                <div>Giá</div>
                <input
                  className='input'
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

export default ProductAddForm;
