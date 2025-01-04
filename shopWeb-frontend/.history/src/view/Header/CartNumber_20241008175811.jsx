import React , { useState }from "react";
import './cartNum.css'

const CartNum = () => {
    const [cartNumber, setCartNumber] = useState(0);
  return (
    <div className="cartNum">
        {cartNumber}
    </div>
  );
};

export default CartNum;
