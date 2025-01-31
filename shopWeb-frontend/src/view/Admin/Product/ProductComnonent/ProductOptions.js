
import React, { useState } from 'react';

function ProductOptions({ colors = [], setProduct }) {
    const [isDialogAddOpen, setDialogAddOpen] = useState(false);
    const [newColor, setNewColor] = useState('');
    const [newColorCode, setNewColorCode] = useState('#000000');
    const [newColorCount, setNewColorCount] = useState(0);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [selectedColor, setSelectedColor] = useState(null);
    const [versionList, setVersionList] = useState([])
    const handleAddColorToProduct = () => {
        const newColorObject = {
            color: newColor,
            code: newColorCode,
        };

        setProduct(prevProduct => ({
            ...prevProduct,
            colors: [...prevProduct.colors, newColorObject]
        }));

        handleDialogAddClose();
        setNewColor('');
        setNewColorCode('');
       
    };

    const handleDialogAddClose = () => {
        setDialogAddOpen(false);
    };
    const handleColorClick = (colorItem) => {
        setSelectedColor(colorItem);
        setNewColor(colorItem.color);
        setNewColorCode(colorItem.code);
        setNewColorCount(colorItem.countInstock);
        setVersionList(colorItem?.version || [])
        setDialogOpen(true);
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
    };
    const handleUpdateColor = () => {
        setProduct(prevProduct => ({
            ...prevProduct,
            colors: prevProduct.colors.map((colorItem) =>
                colorItem.color === selectedColor.color
                    ? { ...selectedColor, color: newColor, code: newColorCode, countInstock: newColorCount,version: versionList }
                    : colorItem
            )
        }));
    
        handleDialogClose();
    };
    const handleDeleteColor = () => {
        setProduct(prevProduct => ({
            ...prevProduct,
            colors: prevProduct.colors.filter(colorItem => colorItem.color !== selectedColor.color)
        }));
        handleDialogClose();
    };
    const handelAddVerison =()=>{
        setVersionList((prev) => [...prev, { name: "", countInstock: 0, price:0 }]);
    }
    const handleVersionChange = (index, field, value) => {
        const updatedVersionList = [...versionList];
        updatedVersionList[index][field] = value;
        // Cập nhật versionList
        setVersionList(updatedVersionList);
        // Cập nhật product
        setProduct((prev) => ({
            ...prev,
            colors: prev.colors.map((colorItem) =>
                colorItem.color === selectedColor.color
                    ? { ...colorItem, version: updatedVersionList }
                    : colorItem
            ),
        }));
      
        console.log("update version",selectedColor.color,updatedVersionList[index][field]);
    };
    
    const handleDeleteVersion = (index) => {
        const updatedVersionList = versionList.filter((_, idx) => idx !== index);
        setVersionList(updatedVersionList);
        // Cập nhật product
        setProduct((prev) => ({
            ...prev,
            colors: prev.colors.map((colorItem) =>
                colorItem.color === selectedColor.color
                    ? { ...colorItem, version: updatedVersionList }
                    : colorItem
            ),
        }));
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
                            onClick={() => handleColorClick(colorItem)}
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
                            type="color"
                            value={newColorCode}
                            onChange={(e) => setNewColorCode(e.target.value)}
                        />
                      
                       <div className='product_option-action'>
                        <button onClick={handleAddColorToProduct}>Thêm</button>
                        <button onClick={handleDialogAddClose} className='closeButton'>Đóng</button>
                       </div>                
                    </div>
                </div>
            )}
           
             {isDialogOpen &&  (
                <div className="dialog-color">
                    <div className="dialog_color-content" style={{ display: 'block', height:"auto", marginTop:"-50%" }}>
                    <h3>Cập nhật màu </h3>
                        <input
                            type="text"
                            value={newColor}
                            onChange={(e) => setNewColor(e.target.value)}
                        />
                          <input
                            type="color"
                            value={newColorCode}
                            onChange={(e) => setNewColorCode(e.target.value)}
                        />
                        <div style={{display:"flex"}}> 
                            <h3>Phiên bản </h3>
                            <div className='btnDel btnadd' onClick={handelAddVerison}>+</div>
                        </div>
                           
                        {versionList?.length > 0 ? (
                            versionList.map((version, idx) => (
                                <div key={idx} className="versionInfo_box">
                                    <input className='verisonName' type="text" value={version.name} placeholder='Phiên bản'
                                        onChange={(e) => handleVersionChange(idx, "name", e.target.value)} />
                                    <input className='versionCount' type="number" value={version.countInstock} placeholder='So luong' 
                                        onChange={(e) => handleVersionChange(idx, "countInstock", e.target.value)}/>
                                    <p>Giá:</p>  
                                    <input className='versionCount' type="number" value={version.price} placeholder='Gía'style={{width:"200px"}}
                                        onChange={(e) => handleVersionChange(idx, "price", e.target.value)} />
                                    <div className='btnDel' onClick={()=>handleDeleteVersion(idx)}>X</div>
                                </div>
                                
                            ))
                        ) : (
                            <p>Chưa có phiên bản nào</p>
                        )}
                                                    
                                                
                    <div className='product_option-action'>
                        <button onClick={handleUpdateColor}>Cập nhật</button>
                        <button className="deleteButton" onClick={handleDeleteColor}>Xóa</button>
                        <button onClick={handleDialogClose} className='closeButton'>Đóng</button>
                    </div>
                    </div>
                </div>
            )}
            
        </div>
    );
}

export default ProductOptions;
