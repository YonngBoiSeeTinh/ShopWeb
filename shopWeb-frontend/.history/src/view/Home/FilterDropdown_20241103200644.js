function FilterDropdown({ title, options = [], onSelect }) {
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