import React, { useContext, useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import FullscreenOutlinedIcon from "@mui/icons-material/FullscreenOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import Notify from "../Notify/Notify";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import Switch from "@mui/material/Switch";
import "./navbar.scss";

const Navbar = ({setFilter}) => {

  const [searchValue, setSearchValue] = useState(''); // Lưu trữ giá trị của input

  const handelSearch = (e) => {
    e.preventDefault();
    setFilter(searchValue); // Cập nhật filter bằng giá trị đã lưu trữ
  };
  const fetchApi = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/order/get?sort=createdAt&sort=desc`);
      return res.data.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  const query = useQuery({ queryKey: ['orders'], queryFn: fetchApi });
  const listOrder = query.data || [];
 
  let listNonAccept = listOrder.filter((item)=>!item.accept)
  
  const [notity, setNotify] = useState([]);
  const [num, setNum] = useState(0);
  useEffect(() => {
    if (listNonAccept.length > 0) {
        const message = `Có ${listNonAccept.length} đơn hàng mới chưa xác nhận` ;
        setNum (listNonAccept.length);
        setNotify(prev => {
            if (!prev.includes(message)) {
                return [...prev, message ]; 
            }
            return prev; 
        });
    }
}, [listNonAccept]);
  return (
    <div className="navbar">
      <div className="navbarContainer">
     
          <form onSubmit={handelSearch} className="search">
            <input type="text"
            placeholder="Tìm kiếm"
            value={searchValue} 
            onChange={(e) => setSearchValue(e.target.value)}  />
            <SearchOutlinedIcon onClick={handelSearch} className="icon"/>
          </form>  
       
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            <span>Tiếng Việt</span>
          </div>
          <div className="item">
            <Switch
              style={{ color: "#210876" }}
              className="icon"     
            />
          </div>
          <div className="item">
            <FullscreenOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <NotificationsActiveOutlinedIcon className="icon" />
            <Notify notity={notity}  num={num}/>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <img src="/assets/person.jpg" alt="" className="profileImg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
