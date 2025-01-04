import React, { useState, useEffect } from "react";
import './ProductDetail.css'; // Đảm bảo bạn đã tạo và liên kết file CSS
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

function ProductDetail() {
    const { name } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Fetch API để lấy dữ liệu sản phẩm
    const fetchApi = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/product/get?filter=name&filter=${name}`);
            console.log('API Response:', res.data);
            return res.data.data[0];
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    const query = useQuery({
        queryKey: ['products', name],
        queryFn: fetchApi
    });

    const product = query.data;

    // Kiểm tra nếu sản phẩm không tồn tại
    if (!product) {
        return <div>Product not found.</div>;
    }

    return (
        <div className="product-container">
            <ProductGallery img={product.image} />
            <ProductUpdateForm product={product} />
        </div>
    );
}

function ProductGallery({ img }) {
    return (
        <section>
            <div className="product-detail">
                <div className="product-image">
                    <div className="product-gallery">      
                        <img src={img} alt="Sản phẩm" className="main-image" />            
                    </div>
                    <div className="thumbnail-gallery">
                        <img src={img} alt="Sản phẩm nhỏ" className="thumbnail" />
                        <img src={img} alt="Sản phẩm nhỏ" className="thumbnail" />
                        <img src={img} alt="Sản phẩm nhỏ" className="thumbnail" />
                    </div>
                </div>
            </div>
        </section>
    );
}

function ProductUpdateForm({ product }) {
    const [updatedProduct, setUpdatedProduct] = useState({ ...product });

    // Xử lý thay đổi của input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Xử lý cập nhật sản phẩm
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3001/api/product/update`, updatedProduct);
            console.log("Update response:", response.data);
            alert("Product updated successfully!");
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const details = [
        { key: "Màn hình", value: updatedProduct.detail?.screen || "Không có thông tin" },
        { key: "Hệ điều hành", value: updatedProduct.detail?.os || "Không có thông tin" },
        { key: "Camera sau", value: updatedProduct.detail?.camara || "Không có thông tin" },
        { key: "Camera trước", value: updatedProduct.detail?.camaraFront || "Không có thông tin" },
        { key: "CPU", value: updatedProduct.detail?.cpu || "Không có thông tin" },
        { key: "RAM", value: updatedProduct.detail?.ram || "Không có thông tin" },
        { key: "ROM", value: updatedProduct.detail?.rom || "Không có thông tin" },
        { key: "MicroSD", value: updatedProduct.detail?.microUSB || "Không có thông tin" },
        { key: "Pin", value: updatedProduct.detail?.battery || "Không có thông tin" },
    ];

    return (
        <form className="product-update-form" onSubmit={handleUpdate}>
            <div className="product-update-form_item">
                <div>Tên sản phẩm</div>
                <input
                    type="text"
                    name="name"
                    value={updatedProduct.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="product-update-form_item">
                <div>Công ty</div>
                <input
                    type="text"
                    name="company"
                    value={updatedProduct.company}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="product-update-form_item">
                <div>Giá</div>
                <input
                    type="number"
                    name="price"
                    value={updatedProduct.price}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>Màu</div>
            <ProductOptions colors = {product.colors}></ProductOptions>
            <div className="info_product">
                <h2>Thông số kỹ thuật</h2>
                <ul className="info">
                    {details.map((item, index) => (
                        <li key={index}>
                            <p>{item.key}:</p>
                            <input
                                type="text"
                                name="item.key"       
                                required
                                style={{width:'300px'}}
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <button type="submit">Cập nhật sản phẩm</button>
        </form>
    );
}

function ProductOptions({colors}) {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [selectedColor, setSelectedColor] = useState(null);

    const handleColorClick = (colorItem) => {
        setSelectedColor(colorItem);
        setDialogOpen(true); // Mở dialog khi click vào màu
    };

    const handleDialogClose = () => {
        setDialogOpen(false); // Đóng dialog
    };
    return (
        <div className="options">  
            <div className="color-options">
                {colors.map((colorItem, index) => (
                    <div 
                        key={index} 
                        className={`color ${colorItem.color.toLowerCase()} `} 
                        style={{ backgroundColor: colorItem.code }} // Đặt màu cho background
                        title={colorItem.color}
                        onClick={() => handleColorClick(colorItem)}
                    >
                         {isDialogOpen && (
                            <div className="dialog" >
                                <div className="dialog-content">
                                    
                                    <h2>Nhập số lượng cho màu {selectedColor.color}</h2>
                                    <input type="number" min="1" placeholder="Số lượng" />

                                    <button onClick={handleDialogClose}>Đóng</button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
export default ProductDetail;
