import React from "react";

function FilterDropdown({ title, options = [], onSelect  }) {

        return (
           
                <div className="dropdown">
                  <button className="dropbtn">{title}</button>
                  <div className="dropdown-content">
                    {options.map((option, index) => (
                      <a key={index} onClick={() => onSelect(option)}>
                        {option.min !== undefined ? priceToString(option.min, option.max) : option.text || option}
                      </a>
                    ))}
                  </div>
                </div>
           
        );
    }
}


export default FilterDropdown;

// Hàm phụ

function priceToString(min, max) {
	if (min == 0) return 'Dưới ' + max / 1E6 + ' triệu';
	if (max == 0) return 'Trên ' + min / 1E6 + ' triệu';
	return 'Từ ' + min / 1E6 + ' - ' + max / 1E6 + ' triệu';
}
function promoToString(name) {
    return ` ${name}`;
}

function starToString(value) {
    return `${value} sao`;
}
