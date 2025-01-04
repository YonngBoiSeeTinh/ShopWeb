import React, { useState } from 'react';


function ProductPromo({updatedProduct, setUpdatedProduct}) {
    const promoOptions = ['moi', 'giamgia', 'tragop'];
    const handlePromoChange = (e) => {
        const { name, value } = e.target;

        setUpdatedProduct((prev) => ({
            ...prev,
            promo: {
                ...prev.promo,
                [name]: value // Cập nhật thông tin khuyến mãi
            }
        }));
    };
   return(
    <div className="info_product promo">
                <h2>Khuyến mãi</h2>
                <ul className="info">
                    <li>
                    <p>Tên Khuyến mãi</p>
                        <select
                            name="name"
                            onChange={handlePromoChange}
                            className='input'
                            defaultValue={updatedProduct.promo.name}
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
                            type="text"
                            name="value"
                            style={{ width: '300px' }}
                            defaultValue={updatedProduct.promo.value}
                            onChange={handlePromoChange}
                            className='input'
                        />
                    </li>
                    <li>
                        <p>Giá gốc:</p>
                        <input
                            type="text"
                            name="oldPrice"
                            style={{ width: '300px' }}
                            defaultValue={updatedProduct.promo.oldPrice}
                            onChange={handlePromoChange}
                            className='input'
                        />
                    </li>
                </ul>
            </div>
   );
}

export default ProductPromo;
