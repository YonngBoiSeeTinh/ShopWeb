const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({

    orderItems:[
        {
            name: { type: String, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            amount: { type: Number, required: true },
            price: { type: Number, required: true },
            userId: { 
                type: String, required: true 
             },
        }
    ]

},
    {
        timestamps: true,
    }
)

const Order = mongoose.model('Order',orderSchema);
module.exports = Order;
