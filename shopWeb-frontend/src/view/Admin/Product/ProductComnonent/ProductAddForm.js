import React,{useState} from 'react';
import ProductOptions from './ProductOptions';
import ProductDetailForm from './ProductDetailForm';
import { useQuery,useQueryClient  } from '@tanstack/react-query';
import axios from 'axios';

function ProductAddForm({ product, handleChange, handleSubmit, setProduct }) {
    const [details, setDetails] = useState(  product?.detail  );
    const fetchApiCategory = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/category/get`);
            return res.data.data; // Đảm bảo đây là một mảng
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };
  
    const queryCategory = useQuery({ queryKey: ['categories'], queryFn: fetchApiCategory });
    const listCategory = queryCategory.data || [];
   
    return (
        <form className="product-update-form" onSubmit={handleSubmit}>
            <div className="product-update-form_item">
                <div>Tên sản phẩm</div>
                <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    required
                    className='input'
                   
                />
            </div>
            <div className="product-update-form_item">
                <div>Danh mục</div>
                <select
                    name="category"
                    onChange={handleChange}
                    className="input"
                    value={product.category || ''} // Đảm bảo luôn có giá trị
                >
                    <option value="" disabled>Chọn danh mục</option>
                    {listCategory.map((option, index) => (
                        <option key={index} value={option._id}>
                            {option.name}
                        </option>
                    ))}
                </select>

            </div>
            <div className="product-update-form_item">
                <div>Giá</div>
                <input
                  className='input'
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    required
                />
            </div>
            <div style={{color:"white", marginBottom:"20px"}}>Màu</div>
            <ProductOptions colors={product?.colors || []} setProduct={setProduct} />
            <div className="info_product promo">
                <h2>Khuyến mãi</h2>
                <ul  className="info">
                    <li>
                        <p>Giá trị:</p>
                        <input
                            type="number"
                            name="promo"
                            value={product.promo}
                            onChange={handleChange}
                            placeholder="Giá trị khuyến mãi"
                            className='input'
                        />
                    </li>
                </ul>              
            </div>
            <ProductDetailForm details = {details || []} setDetails={setDetails} product={product} setProduct={setProduct}/>
            <button type="submit" className='btnSubmit'>Thêm sản phẩm</button>
        </form>
    );
}

export default ProductAddForm;
