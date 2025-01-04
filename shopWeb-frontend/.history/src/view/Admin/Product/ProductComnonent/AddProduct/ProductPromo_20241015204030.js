import React from 'react';

function ProductPromo({ handlePromoChange }) {
    const promoOptions = ['moi', 'giamgia', 'tragop'];
    return (
        <div className="info_product promo">
                <h2>Khuyến mãi</h2>
                <ul  className="info">
                    <li>
                    <p>Tên Khuyến mãi</p>
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
                        <p>Giá trị:</p>
                        <input
                            type="number"
                            name="value"
                            onChange={handlePromoChange}
                            placeholder="Giá trị khuyến mãi"
                        />
                    </li>
                    <li>
                        <p>Giá gốc:</p>
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
