import React , { useState }from "react";
import './cartNum.css'

const CartNum = () => {
    const [cartNumber, setCartNumber] = useState(0);
    
    return (
      <div className="cartNum" style={{ display: cartNumber > 0 ? "flex" : "none" }}>
        {cartNumber}
      </div>
    );
  };

export default CartNum;
