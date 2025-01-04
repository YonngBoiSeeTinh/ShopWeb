import React , { useState }from "react";
import './cartNum.css'

const CartNum = ({userId}) => {
    const fetchApi = async () => {
        try {
          const res = await axios.get(`http://localhost:3001/api/cart/getByUserId/${userId}`);
          return res.data.data;  
        } catch (error) {
          console.error('Error fetching data:', error);
          throw error;
        }
      };
    
    const query = useQuery({ queryKey: ['carts'],queryFn: fetchApi});
    const listCart = query.data || []; 
    const [cartNumber, setCartNumber] = useState(0);
    setCartNumber(listCart.length)
    
    return (
      <div className="cartNum" style={{ display: cartNumber > 0 ? "flex" : "none" }}>
        {cartNumber}
      </div>
    );
  };

export default CartNum;
