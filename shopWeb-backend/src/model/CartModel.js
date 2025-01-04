const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({

            name: { type: String, required: true },
            productId: { type: String, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            totalPrice: { type: Number, required: false},
            amount: { type: Number, required: true },
            userId: { 
                type: String, required: true 
             },
             address: { 
                type: String, required: true 
             },
             userName: { 
                type: String, required: true 
             },
             color: { type: String, required: true }
           

        },

    {
        timestamps: true,
    }
)

const Cart = mongoose.model('Cart',cartSchema);
module.exports = Cart;
