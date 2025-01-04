import React , { useState }from "react";
import './cartNum.css'

const CartNum = () => {
    const [cartNumber, setCartNumber] = useState(1);
    
    return (
      <div className="cartNum" style={{ display: cartNumber > 0 ? "flex" : "none" }}>
        {cartNumber}
      </div>
    );
  };

export default CartNum;
