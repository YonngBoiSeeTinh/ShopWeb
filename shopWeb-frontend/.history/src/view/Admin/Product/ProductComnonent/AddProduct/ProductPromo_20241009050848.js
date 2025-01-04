import React from 'react';

function ProductPromo({ handlePromoChange }) {
    const promoOptions = ['moi', 'giamgia', 'tragop'];
    return (
        <div className="info_product promo">
                <h2>Khuyến mãi</h2>
                <select
                    name="name"
                    onChange={handlePromoChange}
                >
                    {promoOptions.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    name="value"
                    onChange={handlePromoChange}
                    placeholder="Giá trị khuyến mãi"
                />
                <input
                    type="number"
                    name="oldPrice"
                    onChange={handlePromoChange}
                    placeholder="Giá gốc"
                />
            </div>
    );
}

export default ProductPromo;
