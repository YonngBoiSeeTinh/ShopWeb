import { version } from "process";
import React,{useState,useEffect} from "react";

const ProductOptions =({colors,handleColorClick,handleVersionClick,versions =[]})=>{
    const [selectedColor, setSelectedColor] = useState(null); // Trạng thái
    const handleColorSelect = (colorItem) => {
        setSelectedColor(colorItem.color);  // Cập nhật màu đã chọn
        handleColorClick(colorItem);        // Gọi hàm từ parent component để xử lý thêm
    };
    return (
        <div>
            <div className="options">
           
                <label>Màu</label>
                
                <div className="color-options ">
                    {colors.map((colorItem, index) => (
                        <button 
                            key={index} 
                            className={`color ${colorItem.color.toLowerCase()} ${selectedColor === colorItem.color ? 'active' : ''}`} 
                            style={{ backgroundColor: colorItem.code }} // Đặt màu cho background
                            title={colorItem.color}
                            onClick={() => handleColorSelect(colorItem)}
                            
                        >
                        </button>
                    ))}
                </div>
            </div>

            <div className="options">
           
                <label>Phiên bản</label>
                
                <div className="color-options">
                    {versions && versions.length > 0 ? (
                        versions.map((version, index) => (
                            <button 
                                className="version-items"
                                key={index} 
                                onClick={() => handleVersionClick(version)}
                            >
                                {version?.name}
                            </button>
                        ))
                    ) : (
                        <div className="no_version" >Không có phiên bản nào</div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default ProductOptions