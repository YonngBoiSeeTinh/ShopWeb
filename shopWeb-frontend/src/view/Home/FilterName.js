import React from "react";

function FilterName({ onKeyUp }) {
    return (
        <div className="filterName">
            <input type="text" placeholder="Lọc trong trang theo tên..." onKeyUp={onKeyUp} />
        </div>
    );
}

export default FilterName;
