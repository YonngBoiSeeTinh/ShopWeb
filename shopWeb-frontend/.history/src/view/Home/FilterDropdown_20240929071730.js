import React, { Component } from "react";

class FilterDropdown extends Component {
    render() {
        const { title, priceRanges, promotions, stars, sortOptions } = this.props;

        return (
            <div className="dropdown">
                <button className="dropbtn">{title}</button>
                <div className="dropdown-content">
                    {priceRanges && priceRanges.map((range, index) => (
                        <a  key={index}>
                            {priceToString(range.min,range.max)}
                        </a>
                    ))}
                    {promotions && promotions.map((promo, index) => (
                        <a key={index}>
                            {promoToString(promo)}
                        </a>
                    ))}
                    {stars && stars.map((star, index) => (
                        <a  key={index}>
                            {starToString(star)}
                        </a>
                    ))}
                    {sortOptions && sortOptions.map((option, index) => (
                        <a  key={index}>
                            {option.text}
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
    return `Khuyến mãi: ${name}`;
}

function starToString(value) {
    return `${value} sao`;
}
