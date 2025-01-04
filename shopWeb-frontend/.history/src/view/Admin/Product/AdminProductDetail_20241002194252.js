import React, { useState, useEffect } from "react";
import './ProductDetail.css'; // Đảm bảo bạn đã tạo và liên kết file CSS
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

function ProductDetail() {
    const { name } = useParams();
    const [imageLink, setImageLink] = useState('');

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

function ProductGallery({ img, imageLink, handleFileChange }) {
    return (
        <section>
            <div className="product-detail">
                <div className="product-image">
                    <input type="file" id="fileInput" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                    <div className="product-gallery" onClick={() => document.getElementById('fileInput').click()}>
                        <img src={imageLink ? imageLink : img} alt="Sản phẩm" className="main-image" />
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

function ProductUpdateForm({ product, imageLink,setProduct }) {
    const [updatedProduct, setUpdatedProduct] = useState({ ...product });

    // Hàm xử lý thay đổi của input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Hàm xử lý cập nhật sản phẩm
    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedProductCopy = { ...updatedProduct };
        if (imageLink) {
            updatedProductCopy.image = imageLink; // Cập nhật link hình ảnh nếu có thay đổi
        }
        delete updatedProductCopy._id;  // Xóa trường _id
        console.log("Updated Product:", updatedProductCopy); // Kiểm tra dữ liệu
        try {
            //const response = await axios.put(`http://localhost:3001/api/product/update/${product.id}`, updatedProductCopy);
            console.log('update product',updatedProduct);
            console.log('product id', product.id);
           
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

    const promo = ['moi', 'giamgia', 'tragop'];

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
            <ProductOptions colors={product.colors} setProduct = {setProduct}></ProductOptions>
            <div className="info_product promo">
                <h2>Khuyến mãi</h2>
                <ul className="info">
                    <li>
                        <p>Khuyến mãi:</p>
                        <select
                            name="promo"
                            style={{ width: '300px' }}
                            value={updatedProduct.promo.name}
                            onChange={handleChange}
                        >
                            {promo.map((option, index) => (
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
                            name="promoValue"
                            style={{ width: '300px' }}
                            defaultValue={updatedProduct.promo.value}
                            onChange={handleChange}
                        />
                    </li>
                    <li>
                        <p>Giá gốc:</p>
                        <input
                            type="text"
                            name="oldPrice"
                            style={{ width: '300px' }}
                            defaultValue={updatedProduct.promo.oldPrice}
                            onChange={handleChange}
                        />
                    </li>
                </ul>
            </div>
            <div className="info_product">
                <h2>Thông số kỹ thuật</h2>
                <ul className="info">
                    {details.map((item, index) => (
                        <li key={index}>
                            <p>{item.key}:</p>
                            <input
                                type="text"
                                name={item.key}
                                style={{ width: '300px' }}
                                defaultValue={item.value}
                                onChange={handleChange}
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <button className="btnSubmit" type="submit">Cập nhật sản phẩm</button>
        </form>
    );
}

function ProductOptions({ colors = [],setProduct }) {
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

        setProduct(prevProduct => ({
            ...prevProduct,
            colors: [...prevProduct.colors, newColorObject]
        }));

        handleDialogAddClose();
    };

    // Cập nhật màu hiện có
    const handleUpdateColor = () => {
        setProduct(prevProduct => ({
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
                        <button className="dialog-close-button" onClick={handleUpdateColor}>Cập nhật</button>
                        <button className="dialog-close-button" onClick={handleDialogClose}>Đóng</button>
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

export default ProductDetail;
