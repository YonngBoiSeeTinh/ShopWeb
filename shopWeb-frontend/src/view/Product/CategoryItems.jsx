import React,{useState,useContext,useEffect} from 'react';

const CategoryItem = ({ name, image,handleClickCate}) => {
    return (
      <div className="categoy_item" onClick={()=>handleClickCate(name, image)}> 
        <img className='category_item-image' src={image||""}/>
        <div className='categoy_item-name'>{name}</div>
      </div>
    );
  };

export default CategoryItem;
