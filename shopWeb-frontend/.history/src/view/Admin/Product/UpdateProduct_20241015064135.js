import React, { useState, useEffect } from "react";
import './ProductDetail.css'; // Đảm bảo bạn đã tạo và liên kết file CSS
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import ProductGallery from "./ProductComnonent/UpdateProduct/ProductGallery";
import ProductUpdateForm from "./ProductComnonent/UpdateProduct/ProductUpdateForm";

function UpdateProduct() {
    const { name } = useParams();
    const [imageLink, setImageLink] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    
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
    const [product, setProduct] = useState(null);
    useEffect(() => {
        if (query.data) {
            setProduct(query.data);
        }
    }, [query.data]);
   

    // Kiểm tra nếu sản phẩm không tồn tại
    if (!product) {
        return <div>Product not found.</div>;
    }

    // Hàm xử lý thay đổi file ảnh
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageUrl = e.target.result;
                setImageLink(imageUrl);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="product-container">
            <ProductGallery img={product.image} imageLink={imageLink} handleFileChange={handleFileChange} />
            <ProductUpdateForm product={product} imageLink={imageLink} setProduct = {setProduct}/>
        </div>
    );
}



function ProductOptions({ colors = [],setUpdatedProduct }) {

    const [isDialogOpen, setDialogOpen] = useState(false);
    const [selectedColor, setSelectedColor] = useState(null);
    const [isDialogAddOpen, setDialogAddOpen] = useState(false);
    const [newColor, setNewColor] = useState('');
    const [newColorCode, setNewColorCode] = useState('');
    const [newColorCount, setNewColorCount] = useState(0);

    // Xử lý khi chọn một màu để chỉnh sửa
    const handleColorClick = (colorItem) => {
        setSelectedColor(colorItem);
        setNewColor(colorItem.color); // Set màu hiện tại
        setNewColorCode(colorItem.code); // Set mã màu hiện tại
        setNewColorCount(colorItem.countInstock); // Set số lượng hiện tại
        setDialogOpen(true); // Mở dialog khi click vào màu
    };

    const handleDialogClose = () => {
        setDialogOpen(false); // Đóng dialog
    };

    // Mở dialog thêm màu mới
    const handleAddColorClick = () => {
        setDialogAddOpen(true);
    };

    const handleDialogAddClose = () => {
        setDialogAddOpen(false);
        setNewColor(''); // Reset khi đóng
        setNewColorCode('');
        setNewColorCount(0);
    };

    // Thêm màu mới vào sản phẩm
    const handleAddColorToProduct = () => {
        const newColorObject = {
            color: newColor,
            code: newColorCode,
            countInstock: newColorCount
        };

        setUpdatedProduct(prevProduct => ({
            ...prevProduct,
            colors: [...prevProduct.colors, newColorObject]
        }));

        handleDialogAddClose();
    };

    // Cập nhật màu hiện có
    const handleUpdateColor = () => {
        setUpdatedProduct(prevProduct => ({
            ...prevProduct,
            colors: prevProduct.colors.map((colorItem) =>
                colorItem.color === selectedColor.color
                    ? { ...selectedColor, color: newColor, code: newColorCode, countInstock: newColorCount }
                    : colorItem
            )
        }));

        handleDialogClose();
    };
    return (
        <div className="options">
            <div className="color-options">
                {colors.map((colorItem, index) => (
                    <div
                        key={index}
                        className={`color ${colorItem.color.toLowerCase()}`}
                        style={{ backgroundColor: colorItem.code }}
                        onClick={() => handleColorClick(colorItem)}
                    ></div>
                ))}
                <div className="btn-add_color" onClick={handleAddColorClick}>Thêm màu</div>
            </div>

            {isDialogOpen && (
                <div className="dialog-color">
                    <div className="dialog_color-content" style={{ display: 'block' }}>
                        <div>
                            <label>Màu: </label>
                            <input
                                type="text"
                                value={newColor}
                                onChange={(e) => setNewColor(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Mã màu: </label>
                            <input
                                type="text"
                                value={newColorCode}
                                onChange={(e) => setNewColorCode(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Số lượng: </label>
                            <input
                                type="number"
                                value={newColorCount}
                                onChange={(e) => setNewColorCount(parseInt(e.target.value))}
                            />
                        </div>
                        <button className="dialog-button" onClick={handleUpdateColor}>Cập nhật</button>
                        <button className="dialog-button" onClick={handleUpdateColor}>Xóa</button>
                        <button className="dialog-button" onClick={handleDialogClose}>Đóng</button>
                    </div>
                </div>
            )}

            {isDialogAddOpen && (
                <div className="dialog-color">
                    <div className="dialog_color-content" style={{ display: 'block' }}>
                        <p>Thêm màu</p>
                        <input
                            type="text"
                            placeholder="Nhập tên màu"
                            value={newColor}
                            onChange={(e) => setNewColor(e.target.value)}
                        /><br />
                        <input
                            type="text"
                            placeholder="Nhập mã màu"
                            value={newColorCode}
                            onChange={(e) => setNewColorCode(e.target.value)}
                        /><br />
                        <input
                            type="number"
                            placeholder="Nhập số lượng"
                            value={newColorCount}
                            onChange={(e) => setNewColorCount(parseInt(e.target.value))}
                        />
                        <div style={{ display: 'flex' }}>
                            <div className="btn btnOK" onClick={handleAddColorToProduct}>OK</div>
                            <div className="btn btnCancel" onClick={handleDialogAddClose}>Đóng</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UpdateProduct;
