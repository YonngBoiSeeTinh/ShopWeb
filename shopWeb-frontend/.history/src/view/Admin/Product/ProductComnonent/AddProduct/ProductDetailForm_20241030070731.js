import React from 'react';

function ProductDetailForm({  setProduct }) {
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
        setProduct((prev) => ({
            ...prev,
            detail: {
                ...prev.detail,
                [name]: value
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
                            className='input'
                            type="text"
                            name={item.name}
                            onChange={handleDetailChange}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductDetailForm;
