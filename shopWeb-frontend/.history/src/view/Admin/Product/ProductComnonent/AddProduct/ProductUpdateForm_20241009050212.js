import React from 'react';
import ProductOptions from './ProductOptions';
function ProductUpdateForm({ product, handleChange, handleSubmit, setProduct }) {
    const details = [
        { key: "Màn hình", name: "screen", value: "" },
        { key: "Hệ điều hành", name: "os", value:  "" },
        { key: "Camera sau", name: "camera", value: "" },
        { key: "Camera trước", name: "cameraFront", value: "" },
        { key: "CPU", name: "cpu", value:  "" },
        { key: "RAM", name: "ram", value: "" },
        { key: "ROM", name: "rom", value:  "" },
        { key: "MicroSD", name: "microUSB", value:  "" },
        { key: "Pin", name: "battery", value: "" },
    ];
    
    const promoOptions = ['moi', 'giamgia', 'tragop'];
    const handleDetailChange = (e) => {
        const { name, value } = e.target;
        
        setProduct((prev) => ({
            ...prev,
            detail: {
                ...prev.detail,
                [name]: value // Cập nhật thông tin chi tiết
            }
        }));
    };
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
            <div>Màu</div>
            <ProductOptions colors={product.colors} setProduct={setProduct} />
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
            <div className="info_product">
                <h2>Thông số kỹ thuật</h2>
                <ul className="info">
                    {details.map((item, index) => (
                        <li key={index}>
                            <p>{item.key}:</p>
                            <input
                                type="text"
                                name={item.name}             
                                onChange={handleDetailChange}
                              
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <button type="submit">Thêm sản phẩm</button>
        </form>
    );
}

export default ProductUpdateForm;
