import React,{useState,useContext,useEffect} from 'react';
import './Styles/adminProduct.scss'
import ProductItem from './product-item'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useQuery,useQueryClient  } from '@tanstack/react-query';
import { FilterContext } from '../AdminLayout';
import Pagination from '../../Pagination'

const ProductsPage = ({setAlertMessage,setShowAlert, setType}) => {
  const { filter } = useContext(FilterContext);
  const [totalPage,setTotalPage] = useState(0);
  const [currentPage,setCurrentPage] = useState(0); 
  const [isOpenDialog,setIsOpenDialog] = useState(false); 
  const [categoryImage,setCategoryImage] = useState(""); 
  const [categoryId,setCategoryId] = useState(""); 
  const [categoryName,setCategoryName] = useState(""); 
  const [isOpenDialogCategory, setIsOpenDialogCategory] = useState(false)
    
      const handleClickCate = (name, id, image) => {
          setIsOpenDialogCategory(true);
          setCategoryName(name);
          setCategoryId(id);
          setCategoryImage(image);
      };

    
      const handleCloseDialogCate = () => {
        setIsOpenDialogCategory(false);
      };
  

    const queryClient = useQueryClient(); // Tạo đối tượng queryClient cap nhat catch khong can gopi API

      const fetchApi = async () => {
          try {
              const res = await axios.get(`http://localhost:3001/api/product/get`);
            
              setTotalPage(res.data.totalPage*10)
              return res.data.data; // Đảm bảo đây là một mảng
          } catch (error) {
              console.error('Error fetching data:', error);
              throw error;
          }
      };

      const query = useQuery({ queryKey: ['products', currentPage], queryFn: fetchApi });
      const listPro = query.data || [];
      
      const [filterListPro, setFilterListPro] = useState(listPro);

      // useEffect(() => {
      //   if (filter) {
      //       setFilterListPro(listPro.filter((item) =>item.name.toLowerCase().includes(filter.toLowerCase())));
      //   } else {
      //       setFilterListPro(listPro); // Nếu không có filter, hiển thị tất cả
      //   }
      // }, [filter, listPro]);


    const handleProductDelete = async (deletedProductId) => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:3001/api/product/delete/${deletedProductId}`);
                setAlertMessage("Xóa sản phẩm thành công");
                setType("success");
                setShowAlert(true);
                // Refetch data after delete
                queryClient.invalidateQueries(['products']); // Invalidate and refetch products
            }  catch (err) {
              if (err.response && err.response.data && err.response.data.message) {
                  setAlertMessage(err.response.data.message);  
              } 
              setType("warning");
              setShowAlert(true);
              console.error("Error updating product:", err);
          }
        }
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      const category = {
        name:categoryName,
        image : categoryImage
      }
      try {
          const response = await axios.post('http://localhost:3001/api/category/create', category);
       
          if(response.data.status === "OK"){
              setAlertMessage("Thêm danh mục thành công");
              setType("success");
              setShowAlert(true);
              queryClient.invalidateQueries(['categories']); 
              setIsOpenDialog(false);
          }
         
      } catch (error) {
          if (error.response) {
              // Lỗi do server trả về
              setAlertMessage(error.response.data.message || error.message);
              setShowAlert(true);
              setType("warning");
          } 
          console.error("There was an error adding the product!", error);
      }
    };
    const handleUpdateCate = async (e,id) => {
      e.preventDefault();
      const category = {
        name:categoryName,
        image : categoryImage
      }
      try {
          const response = await axios.put(`http://localhost:3001/api/category/update/${id}`, category);
       
          if(response.data.status === "OK"){
              setAlertMessage("Cập nhật danh mục thành công");
              setType("success");
              setShowAlert(true);
              queryClient.invalidateQueries(['categories']); 
              setIsOpenDialogCategory(false);
          }
         
      } catch (error) {
          if (error.response) {
              // Lỗi do server trả về
              setAlertMessage(error.response.data.message || error.message);
              setShowAlert(true);
              setType("warning");
          } 
          console.error("There was an error update the cate!", error);
      }
    };
    const handleDeleteCate = async (e,id) => {
      e.preventDefault();
      try {
          const response = await axios.delete(`http://localhost:3001/api/category/delete/${id}`);
     
          if(response.data.status === "OK"){
              setAlertMessage("Xóa danh mục thành công");
              setType("success");
              setShowAlert(true);
              queryClient.invalidateQueries(['categories']); 
              setIsOpenDialog(false);
          }
         
      } catch (error) {
          if (error.response) {
              // Lỗi do server trả về
              setAlertMessage(error.response.data.message || error.message);
              setShowAlert(true);
              setType("warning");
          } 
          console.error("There was an error adding the product!", error);
      }
    };
    const fetchApiCategory = async () => {
      try {
            const res = await axios.get(`http://localhost:3001/api/category/get`);
            setTotalPage(res.data.totalPage*10)
            return res.data.data; // Đảm bảo đây là một mảng
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

  const queryCategory = useQuery({ queryKey: ['categories'], queryFn: fetchApiCategory });
  const listCategory = queryCategory.data || [];
  const handelAdddCategory =()=>{
    setIsOpenDialog(true);
  }
 
  const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
              const imageUrl = e.target.result;
              setCategoryImage(imageUrl);
          };
          reader.readAsDataURL(file);
      }
  };
    return (
      <div className="admin-product-container">
        <h3>SẢN PHẨM</h3>
        <div className='product_page-ttitle' >Danh sách danh mục</div>
        <div className='category_list'>
          <button className='add_categoty-btn' onClick={handelAdddCategory}>+</button>
          {listCategory.map((item, index) => (
            <div key={index} className="categoy_item" onClick={() => handleClickCate(item.name, item._id, item.image)}>
                <img className="category_item-image " src={item.image || ""} />
                <div className="category_item-name">{item.name}</div>
            </div>
        ))}
        
        </div>
        <div className='product_page-ttitle' >Danh sách sản phẩm </div>
        <div className="admin-product-list">
        {Array.isArray(listPro) && listPro.map((product, index) => (
            <ProductItem product={product} key={index} onDelete={handleProductDelete} />
        ))}

        </div>
        <Pagination totalPage={totalPage} currentPage={currentPage} setCurrentPage={setCurrentPage} className="pagiantion"></Pagination>    
      <Link to="/admin/addProduct">
          <div className='btnAdd'>
            Thêm sản phẩm
          </div>
      </Link>
      {isOpenDialog && (
                <div className="dialog">
                     <div  style={{marginBottom:"10px"}}>Thêm danh mục </div>
                    <div className="dialog-content" style={{ display: 'flex'}}>
                          <input type="file" id="subInput" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                            <img src={categoryImage || '/addicon.jpg'} 
                              className='dialog_category-img'
                              onClick={() => document.getElementById('subInput').click()}
                              style={{margin:"5px"}} />
                            <div>
                              <div>Tên danh mục</div>
                              <input
                              className='dialog_category-name'
                              type="text"
                              value={categoryName}
                              onChange={(e) => setCategoryName(e.target.value)} />
                            </div>
                    </div>
                    <div className='product_option-action'>
                        <button  onClick={handleSubmit} >Thêm</button>
                        <button className="deleteButton" onClick={()=>setIsOpenDialog(false)}>Đóng</button>
                    </div>
                </div>
      )}
      {isOpenDialogCategory && (
            <div className="dialog">
                <div  style={{marginBottom:"10px"}}  >Cập nhật danh mục </div>
                <div className="dialog-content" style={{ display: 'flex'}}>
                      <input type="file" id="subInput" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                      <img src={categoryImage || '/addicon.jpg'} alt="Sản phẩm nhỏ" className="thumbnail" 
                         onClick={() => document.getElementById('subInput').click()}
                      />
                     <div>
                        <div>Tên danh mục</div>
                        <input
                          className='dialog_category-name'
                          type="text"
                          value={categoryName}
                          onChange={(e) => setCategoryName(e.target.value)} />
                      </div>
                </div>
                <div className='product_option-action'>
                    <button onClick={(e) => handleUpdateCate(e, categoryId)} >Cập nhật</button>
                    <button className="deleteButton" onClick={(e) => handleDeleteCate(e, categoryId)} >Xóa</button>
                    <button onClick={handleCloseDialogCate} className='closeButton'>Đóng</button>
                </div>
            </div>
        )}
      </div>
      
    );
  };

export default ProductsPage;
