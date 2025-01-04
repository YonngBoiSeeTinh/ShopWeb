import React from 'react';
import ProductOptions from './ProductOptions';
import ProductDetailForm from './ProductDetailForm';
function ProductAddForm({ product, handleChange, handleSubmit, setProduct }) {
   
    const categoryOption = ['Apple', 'Samsung', 'Oppo', 'Xiaomi', 'Headphone', 'Accessories'];
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
                <div>Danh mục</div>
                <select
                    name="company"
                    onChange={handleChange}
                    className='input'
                >
                    {categoryOption.map((cate, index) => (
                        <option key={index} value={cate}>
                            {cate}
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
            <div className="info_product promo">
                <h2>Khuyến mãi</h2>
                <ul  className="info">
                    <li>
                        <p>Giá trị:</p>
                        <input
                            type="number"
                            name="promo"
                            value={product.promo}
                            onChange={handleChange}
                            placeholder="Giá trị khuyến mãi"
                            className='input'
                        />
                    </li>
                </ul>              
            </div>
            <ProductDetailForm setProduct={setProduct}/>
            <button type="submit" className='btnSubmit'>Thêm sản phẩm</button>
        </form>
    );
}

export default ProductAddForm;
