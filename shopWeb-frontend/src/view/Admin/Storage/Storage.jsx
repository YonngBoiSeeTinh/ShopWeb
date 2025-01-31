import React,{useState,useContext} from "react";
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Pagination from '../../Pagination'
import './Storage.scss'
import { FilterContext } from '../AdminLayout';

const Storage = ({setAlertMessage,setShowAlert, setType}) => {
    const { filter } = useContext(FilterContext);
    console.log(filter);
    const [currentPage,setCurrentPage] = useState(0); 
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({});
    const [inputQuantity, setInputQuantity] = useState(0);
    const queryClient = useQueryClient();
    const fetchApi = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/product/get`);     
            return res.data.data; // Đảm bảo đây là một mảng
            
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    const query = useQuery({
        queryKey: ['products', currentPage],
        queryFn: fetchApi,
    });
    const listProduct = query.data || [];
    
    const listFilter = filter ?listProduct.filter((item) => item.name.toLowerCase().includes(filter.toLowerCase()))
    :listProduct

    const itemsPerPage = 8; // Số lượng sản phẩm mỗi trang
    const totalPage = Math.ceil(listProduct.length / itemsPerPage); 

    const startIndex = currentPage * itemsPerPage;
    const currentPro = listFilter.slice(startIndex, startIndex + itemsPerPage);

    // Mutation cập nhật số lượng màu sắc
    const updateColorQuantity =async(id, color, version, amount)=>{
                const stockRes = await axios.put(`http://localhost:3001/api/product/addStorage/${id}`, {
                    color:  color,
                    version:version,
                    amount: amount,
                });
                queryClient.invalidateQueries(['products']); // Refetch dữ liệu sản phẩm
                setAlertMessage("Nhập hàng thành công");
                  setType("success");
                  setShowAlert(true);
                setIsDialogOpen(false); // Đóng hộp thoại
    }
    

  const handleOpenDialog = (product) => {
    console.log('product', product.colors);
      setSelectedProduct(product);
      setIsDialogOpen(true);
  };

  
  const calculateTotalStock =  (product) => {
      // Tính tổng số lượng hàng tồn kho
      const totalStock = product.colors.reduce((total, color) => {
        const versionStock = color.version.reduce((subTotal, version) => {
          return subTotal + (version.countInstock || 0);
        }, 0);
        return total + versionStock;
      }, 0);
  
      return totalStock;
    } 
  
    return (
    <div className="storage_container">
      <h3>Tồn kho</h3>
      <div className="storage_title">
        <div className="num"> STT</div>
        <div className="name"> Sản phẩm</div>
        <div className="version"> Màu</div>
        <div className="count"> Số lượng</div>
        <div className="action"> Hành động</div>
      </div>
      <div className="storage_list">
        {currentPro.map((item, index)=>(
            <div className="storage_item" key = {index}>
              <div className="num"> {index+1} </div>
              <div className="name"> <img className="order_item-image" src={item?.image}/>  {item.name}</div>
             
              <div className="version">
                {item?.colors?.length > 0 ? (
                    item.colors.map((color, index) => (
                        <div className="color_icon"  key={index} style={{ background: color.code }}> </div>  ))
                    ) : (
                        <div>Loading...</div>
                    )}
              </div>
              <div className= {calculateTotalStock(item) > 0 ? "count" : "count outStock"} > {calculateTotalStock(item) > 0 ?calculateTotalStock(item) : "Hết hàng" }</div>
              <div className="action"><p onClick={() => handleOpenDialog(item)}>Nhập hàng</p></div>
                    
         </div>
        ))}
      
      </div>
      <Pagination  totalPage={totalPage*10} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      {isDialogOpen && (
                <div className="dialog-overlay">
                    <div className="dialog">
                        <div className="dialog_header">
                            <h4>Nhập hàng</h4>
                            <button onClick={() => setIsDialogOpen(false)}>x</button>
                        </div>
                        
                         <div className="product"> 
                            <img className="order_item-image" src={selectedProduct?.image}/> 
                             {selectedProduct.name}
                         </div>
                         <div className="version_box">
                            {
                                selectedProduct?.colors.length > 0 ? (
                                    selectedProduct.colors.map((color, index) => (
                                    <div key={index} className="verison_item">
                                        <div className="color_icon" style={{ background: color.code }}>
                                        </div>
                                        <div>
                                            {color.version.map((item, index)=>(
                                                    <div key = {index} className="verison_icon">
                                                      
                                                        <div className="name">Phiên bản: {item.name}</div>
                                                        <div className="stock">Số lượng: {item.countInstock}</div>
                                                        <input
                                                            type="number"
                                                            placeholder="Nhập số lượng"
                                                            value={inputQuantity}
                                                            onChange={(e) => setInputQuantity(e.target.value)}
                                                            min="0"
                                                        />

                                                      <button onClick={()=>updateColorQuantity(selectedProduct._id,color.color,item.name,inputQuantity)}>Nhập hàng</button>
                                                        
                                                    </div>
                                                ))}
                                        </div>
                                       
                                    </div>
                                    ))
                                ) : (
                                    <p>Không có màu nào để hiển thị.</p>
                                )
                            }
                         </div>
                    </div>
                </div>
            )}
    </div> 
     );
}

export default Storage;
