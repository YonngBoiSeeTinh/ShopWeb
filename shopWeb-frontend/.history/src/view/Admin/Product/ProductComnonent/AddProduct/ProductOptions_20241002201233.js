import React, { useState } from 'react';

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
                        ></div>
                    ))
                ) : (
                    <p>Chưa có màu nào</p>
                )}
                <div className="btn-add_color" onClick={() => setDialogAddOpen(true)}>Thêm</div>
            </div>

            {isDialogAddOpen && (
                <div className="dialog-color">
                    <div className="dialog_color-content" style={{ display: 'block' }}>
                        <p>Thêm màu cho sản phẩm:</p>
                        <input
                            type="text"
                            placeholder="Tên màu"
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
                            onChange={(e) => setNewColorCount(e.target.value)}
                        />
                        <button onClick={handleAddColorToProduct}>Thêm</button>
                        <button onClick={handleDialogAddClose}>Đóng</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductOptions;
