import React from 'react';

function ProductPromo({ handlePromoChange }) {
    const promoOptions = ['moi', 'giamgia', 'tragop'];
    return (
        <div className="info_product promo">
                <h2>Khuyến mãi</h2>
                <ul  className="info">
                    <li>
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
                    </li>
                    <li>
                    <input
                        type="number"
                        name="value"
                        onChange={handlePromoChange}
                        placeholder="Giá trị khuyến mãi"
                    />
                    </li>
                    <li>
                    <input
                            type="number"
                            name="oldPrice"
                            onChange={handlePromoChange}
                            placeholder="Giá gốc"
                        />
                    </li>
                </ul>              
            </div>
    );
}

export default ProductPromo;
