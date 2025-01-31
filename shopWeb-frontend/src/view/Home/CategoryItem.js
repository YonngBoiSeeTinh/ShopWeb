import React from "react";

const CategoryItem =({cate,  handleClickCate})=>{
    return(
        <div className="category_items" onClick={handleClickCate}>
            <div className="category_image">
                <img src={cate.image}/>
            </div>
           
            <div className="cate_name">{cate.name}</div>
        </div>
    )
    
}

export default CategoryItem