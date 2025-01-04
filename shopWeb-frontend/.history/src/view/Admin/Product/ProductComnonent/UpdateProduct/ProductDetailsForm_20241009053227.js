import React from 'react';

function ProductDetailForm({updateProduct,setUpdatedProduct }) {
    const details = [
        { key: "Màn hình", name: "screen" },
        { key: "Hệ điều hành", name: "os" },
        { key: "Camera sau", name: "camera" },
        { key: "Camera trước", name: "cameraFront" },
        { key: "CPU", name: "cpu" },
        { key: "RAM", name: "ram" },
        { key: "ROM", name: "rom" },
        { key: "MicroSD", name: "microUSB" },
        { key: "Pin", name: "battery" },
    ];

    const handleDetailChange = (e) => {
        const { name, value } = e.target;
        
        setUpdatedProduct((prev) => ({
            ...prev,
            detail: {
                ...prev.detail,
                [name]: value // Cập nhật thông tin chi tiết
            }
        }));
    };

    return (
        <div className="info_product">
                <h2>Thông số kỹ thuật</h2>
                <ul className="info">
                    {details.map((item, index) => (
                        <li key={index}>
                            <p>{item.key}:</p>
                            <input
                                type="text"
                                name={item.name}    
                                style={{ width: '100%' }}
                                defaultValue={item.value}
                                onChange={handleDetailChange}
                            />
                        </li>
                    ))}
                </ul>
            </div>
    );
}

export default ProductDetailForm;
