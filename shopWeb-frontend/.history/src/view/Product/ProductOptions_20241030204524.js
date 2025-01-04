import React,{useState} from "react";

const ProductOptions =({colors,handleColorClick})=>{
    const [selectedColor, setSelectedColor] = useState(null);

    const handleColorSelect = (colorItem) => {
        setSelectedColor(colorItem.color);  // Cập nhật màu đã chọn
        handleColorClick(colorItem);        // Gọi hàm từ parent component để xử lý thêm
    };
    return (
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
    );
}

export default ProductOptions