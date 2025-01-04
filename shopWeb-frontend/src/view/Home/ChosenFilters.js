import React from "react";

function ChosenFilters() {
    return (
        <div className="choosedFilter flexContain">
            <a id="deleteAllFilter" style={{ display: 'none' }}>
                <h3>Xóa bộ lọc</h3>
            </a>
        </div>
    );
}

export default ChosenFilters;
