import React from 'react';
import ProductDetailForm from './ProductDetailForm';

function ProductForm({ product, setProduct, handleSubmit }) {
    return (
        <form className="product-update-form" onSubmit={handleSubmit}>
            <div className="product-update-form_item">
                <div>Tên sản phẩm</div>
                <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={(e) => setProduct({ ...product, name: e.target.value })}
                    required
                />
            </div>
            <div className="product-update-form_item">
                <div>Công ty</div>
                <input
                    type="text"
                    name="company"
                    onChange={(e) => setProduct({ ...product, company: e.target.value })}
                    required
                />
            </div>
            <div className="product-update-form_item">
                <div>Giá</div>
                <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={(e) => setProduct({ ...product, price: e.target.value })}
                    required
                />
            </div>
            <ProductDetailForm product={product} setProduct={setProduct} />
            <button className="btnSubmit" type="submit">Thêm sản phẩm</button>
        </form>
    );
}

export default ProductForm;
