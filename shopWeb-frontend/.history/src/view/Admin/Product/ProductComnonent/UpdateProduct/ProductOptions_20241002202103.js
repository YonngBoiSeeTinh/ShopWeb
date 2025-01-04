import React, { useState } from 'react';

function ProductOptions({ colors = [], setProduct }) {
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

        setProduct(prevProduct => ({
            ...prevProduct,
            colors: [...prevProduct.colors, newColorObject]
        }));

        handleDialogAddClose();
    };

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

            {/* Dialog edit color */}
            {isDialogOpen && (
                <div className="dialog">
                    <h3>Cập nhật màu sắc</h3>
                    <div>
                        <label>Tên màu:</label>
                        <input
                            type="text"
                            value={newColor}
                            onChange={(e) => setNewColor(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Mã màu:</label>
                        <input
                            type="text"
                            value={newColorCode}
                            onChange={(e) => setNewColorCode(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Số lượng:</label>
                        <input
                            type="number"
                            value={newColorCount}
                            onChange={(e) => setNewColorCount(Number(e.target.value))}
                        />
                    </div>
                    <button onClick={handleUpdateColor}>Cập nhật</button>
                    <button onClick={handleDialogClose}>Đóng</button>
                </div>
            )}

            {/* Dialog add color */}
            {isDialogAddOpen && (
                <div className="dialog">
                    <h3>Thêm màu sắc mới</h3>
                    <div>
                        <label>Tên màu:</label>
                        <input
                            type="text"
                            value={newColor}
                            onChange={(e) => setNewColor(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Mã màu:</label>
                        <input
                            type="text"
                            value={newColorCode}
                            onChange={(e) => setNewColorCode(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Số lượng:</label>
                        <input
                            type="number"
                            value={newColorCount}
                            onChange={(e) => setNewColorCount(Number(e.target.value))}
                        />
                    </div>
                    <button onClick={handleAddColorToProduct}>Thêm</button>
                    <button onClick={handleDialogAddClose}>Đóng</button>
                </div>
            )}
        </div>
    );
}

export default ProductOptions;
