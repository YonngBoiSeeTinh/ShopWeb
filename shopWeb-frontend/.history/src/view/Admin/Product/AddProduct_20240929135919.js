import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = ({ onProductAdded }) => {
    const [product, setProduct] = useState({
        name: '',
        company: '',
        image: '',
        price: '',
        rating: '',
        rateCount: '',
        countInstock: '',
        description: '',
        promo: {
            name: '',
            value: '',
            oldPrice: ''
        },
        detail: {
            screen: '',
            os: '',
            camera: '',
            cameraFront: '',
            cpu: '',
            ram: '',
            rom: '',
            microUSB: '',
            battery: ''
        },
        colors: [{
            color: '',
            image: '',
            countInstock: ''
        }]
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/products', product);
            console.log(response.data);
            onProductAdded(response.data); // Call the parent function to refresh the list
            setProduct({}); // Reset form after submission
        } catch (error) {
            console.error("There was an error adding the product!", error);
        }
    };

    return (
        <form className='form-add' onSubmit={handleSubmit}>
            <div className='from-container'>
                <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
                <input type="text" name="company" placeholder="Company" onChange={handleChange} required />
                <input type="text" name="image" placeholder="Image URL" onChange={handleChange} required />
                <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
                <input type="number" name="rating" placeholder="Rating" onChange={handleChange} required />
                <input type="number" name="countInstock" placeholder="Count In Stock" onChange={handleChange} required />
                <textarea name="description" placeholder="Description" onChange={handleChange} required></textarea>
                <button type="submit">Add Product</button>
            </div>
         
        </form>
    );
};

export default AddProduct;
