const mongoose = require('mongoose');

const detailSchema = new mongoose.Schema({
    name: { type: String, required: false },
    value: { type: String, required: false },
});
const versionSchema = new mongoose.Schema({
    name: { type: String, required: false },
    price: { type: String, required: false },
    countInstock: { type: Number, required: false }
});
const colorSchema = new mongoose.Schema({
    color: { type: String, required: false },
    code: { type: String, required: false },
    version:{type: [versionSchema], required:false}
});

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        category: { type: String, required: false },
        image: { type: String, required: false },
        subImage: { type: [String], required: false },
        price: { type: Number, required: false },
        rating: { type: Number, required: false },
        rateCount: { type: Number, required: false },
        promo: { type: Number, required: false },
        detail: { type: [detailSchema], required: false },
        description: { type: String, required: false },
        colors: { type: [colorSchema], required: false }
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
