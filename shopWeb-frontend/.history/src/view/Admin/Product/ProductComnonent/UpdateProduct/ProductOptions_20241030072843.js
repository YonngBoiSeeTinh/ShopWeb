import React, { useState } from 'react';

function ProductOptions({ colors = [], setUpdatedProduct }) {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [selectedColor, setSelectedColor] = useState(null);
    const [isDialogAddOpen, setDialogAddOpen] = useState(false);
    const [newColor, setNewColor] = useState('');
    const [newColorCode, setNewColorCode] = useState('');
    const [newColorCount, setNewColorCount] = useState(0);

    const handleColorClick = (colorItem) => {
        setSelectedColor(colorItem);
        setNewColor(colorItem.color);
        setNewColorCode(colorItem.code);
        setNewColorCount(colorItem.countInstock);
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleAddColorClick = () => {
        setDialogAddOpen(true);
    };

    const handleDialogAddClose = () => {
        setDialogAddOpen(false);
        setNewColor('');
        setNewColorCode('');
        setNewColorCount(0);
    };

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
    const handleDeleteColor = () => {
        setUpdatedProduct(prevProduct => ({
            ...prevProduct,
            colors: prevProduct.colors.filter(colorItem => colorItem.color !== selectedColor.color)
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

            {/* Dialog edit color */}
            {isDialogOpen && (
                <div className="dialog-color">
                    <div className="dialog_color-content" style={{ display: 'block' }}>
                    <h3>Cập nhật màu </h3>
                        <input
                            type="text"
                            value={newColor}
                            onChange={(e) => setNewColor(e.target.value)}
                        />
                        <input 
                            type='color'
                            value={newColorCode}
                        />
                        <input
                            type="text"
                            value={newColorCode}
                            onChange={(e) => setNewColorCode(e.target.value)}
                        />
                        <input
                            type="number"
                            value={newColorCount}
                            onChange={(e) => setNewColorCount(Number(e.target.value))}
                        />   
                    <div className='product_option-action'>
                        <button onClick={handleUpdateColor}>Cập nhật</button>
                        <button className="deleteButton" onClick={handleDeleteColor}>Xóa</button>
                        <button onClick={handleDialogClose} className='closeButton'>Đóng</button>
                    </div>
                    </div>
                </div>
            )}

            {/* Dialog add color */}
            {isDialogAddOpen && (
                <div className="dialog-color">
                    <div className="dialog_color-content" style={{ display: 'block' }}>
                    <p>Thêm màu cho sản phẩm:</p>
                        <input
                            placeholder="Tên màu"
                            type="text"
                            value={newColor}
                            onChange={(e) => setNewColor(e.target.value)}
                        />
                        <input
                            type="text"
                             placeholder="Mã màu"
                            value={newColorCode}
                            onChange={(e) => setNewColorCode(e.target.value)}
                        />
                        <input
                            type="number"
                             placeholder="Số lượng tồn"
                            value={newColorCount}
                            onChange={(e) => setNewColorCount(Number(e.target.value))}
                        />
                        <div className='product_option-action'>
                            <button onClick={handleAddColorToProduct}>Thêm</button>
                            <button onClick={handleDialogAddClose} className='closeButton'>Đóng</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductOptions;
