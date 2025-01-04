import React, { useState } from 'react';

function ProductDetailForm({ setProduct }) {
    const [details, setDetails] = useState([{ name: "Hãng", value: "" },
                                            { name: "Giao hàng từ", value: "" }]);
   
    const handleDetailChange = (index, field, value) => {
        const updatedDetails = [...details];
        updatedDetails[index][field] = value.toString();
        setDetails(updatedDetails);

        // Cập nhật chi tiết sản phẩm trong setProduct
        setProduct((prev) => ({
            ...prev,
            detail: updatedDetails,
        }));
    };

    const handleAddDetail = (e) => {
        e.preventDefault(); 
        setDetails((prev) => [...prev, { name: "", value: "" }]);
    };
    const handleDeleteDetail = (index) => {
        setDetails((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="info_product">
            <h2>Chi tiết sản phẩm</h2>
            <ul className="info">
                {details.map((item, index) => (
                    <li key={index}>
                        <input
                            className="name"
                            type="text"
                            placeholder="Tên chi tiết"
                            value={item.name}
                            onChange={(e) => handleDetailChange(index, "name", e.target.value)}
                        />
                        <input
                            className="input"
                            type="text"
                            placeholder="Giá trị chi tiết"
                            value={item.value}
                            onChange={(e) => handleDetailChange(index, "value", e.target.value)}
                        />
                          <button type="button" onClick={() => handleDeleteDetail(index)}>Xóa</button>
                    </li>
                ))}
            </ul>
            <button className='btn-add_color' onClick={handleAddDetail}>Thêm</button>
        </div>
    );
}

export default ProductDetailForm;
