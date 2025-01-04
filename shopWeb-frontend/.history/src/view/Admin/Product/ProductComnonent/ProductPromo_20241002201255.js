import React from 'react';

function ProductPromo({ product, setProduct }) {
    return (
        <div className="promo">
            <h2>Khuyến mãi</h2>
            <input
                type="text"
                placeholder="Tên khuyến mãi"
                value={product.promo.name}
                onChange={(e) => setProduct({ ...product, promo: { ...product.promo, name: e.target.value } })}
            />
            <input
                type="number"
                placeholder="Giá trị khuyến mãi"
                value={product.promo.value}
                onChange={(e) => setProduct({ ...product, promo: { ...product.promo, value: e.target.value } })}
            />
            <input
                type="number"
                placeholder="Giá cũ"
                value={product.promo.oldPrice}
                onChange={(e) => setProduct({ ...product, promo: { ...product.promo, oldPrice: e.target.value } })}
            />
        </div>
    );
}

export default ProductPromo;
