import React, { useState, useEffect } from "react";
import './ProductDetail.css'; // Đảm bảo bạn đã tạo và liên kết file CSS
import axios from 'axios';

function ProductDetail() {
    const [imageLink, setImageLink] = useState('');
    const [product, setProduct] = useState({
        name: '',
        company: '',
        image: '',
        price: Number('0'),
        rating: Number('5'),
        rateCount: Number('0'),
        description: '',
        promo: {
            name: '',
            value: Number(0),
            oldPrice: Number(0)
        },
        detail: {
            screen: 'chưa có thông tin',
            os: 'chưa có thông tin',
            camera: 'chưa có thông tin',
            cameraFront: 'chưa có thông tin',
            cpu: 'chưa có thông tin',
            ram: 'chưa có thông tin',
            rom: 'chưa có thông tin',
            microUSB: 'chưa có thông tin',
            battery: 'chưa có thông tin'
        },
        colors: [
            
        ]
    });
  
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageUrl = e.target.result;
                setImageLink(imageUrl);
                setProduct((prev) => ({
                    ...prev,
                    image: imageUrl // Cập nhật đường dẫn hình ảnh vào sản phẩm
                }));
            };
            reader.readAsDataURL(file);
        }
    };



    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(product);
        try {
            const response = await axios.post('http://localhost:3001/api/product/create', product);
         
            setProduct({}); // Reset form after submission
            setImageLink(''); // Reset image link
        } catch (error) {
            console.error("There was an error adding the product!", error);
        }
    };

    return (
        <div className="product-container">
            <ProductGallery imageLink={imageLink} handleFileChange={handleFileChange} />
            <ProductUpdateForm product={product} handleChange={handleChange} handleSubmit={handleSubmit} setProduct={setProduct} />
        </div>
    );
}

function ProductGallery({ imageLink, handleFileChange }) {
    return (
        <section>
            <div className="product-detail">
                <div className="product-image">
                    <input type="file" id="fileInput" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                    <div className="product-gallery" onClick={() => document.getElementById('fileInput').click()}>
                        <img src={imageLink ? imageLink : ""} alt="Sản phẩm" className="main-image" />
                    </div>
                    <div className="thumbnail-gallery">
                        <img src={imageLink ? imageLink : ""} className="thumbnail" />
                    </div>
                </div>
            </div>
        </section>
    );
}

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
                    name="promoName"
                    onChange={handleChange}
                >
                    {promoOptions.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    name="promoValue"
                    onChange={handleChange}
                    placeholder="Giá trị khuyến mãi"
                />
                <input
                    type="number"
                    name="promoOldPrice"
                    onChange={handleChange}
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
                               
                                onChange={handleChange}
                              
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <button type="submit">Thêm sản phẩm</button>
        </form>
    );
}


function ProductOptions({ colors = [], setProduct }) {
    const [isDialogAddOpen, setDialogAddOpen] = useState(false);
    const [newColor, setNewColor] = useState('');
    const [newColorCode, setNewColorCode] = useState('');
    const [newColorCount, setNewColorCount] = useState(0);

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
        setNewColor('');
        setNewColorCode('');
        setNewColorCount(0);
    };

    const handleAddColorClick = () => {
        setDialogAddOpen(true);
    };

    const handleDialogAddClose = () => {
        setDialogAddOpen(false);
    };

    return (
        <div className="options">  
            <div className="color-options">
                {colors.length > 0 ? (
                    colors.map((colorItem, index) => (
                        <div 
                            key={index} 
                            className={`color ${colorItem.color.toLowerCase()}`} 
                            style={{ backgroundColor: colorItem.code }} 
                            title={colorItem.color}
                        >
                        </div>
                    ))
                ) : (
                    <p>Chưa có màu nào</p>
                )}
                <div className="btn-add_color" onClick={handleAddColorClick}>Thêm</div>
            </div>

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
                            <div className="btn btnCancle" onClick={handleDialogAddClose}>Đóng</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}



export default ProductDetail;
