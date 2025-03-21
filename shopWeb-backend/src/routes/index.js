const UserRouter = require('./UserRouter');
const ProductRouter = require('./ProductRouter');
const CartRouter = require('./CartRouter')
const OrderRouter = require('./OrderRouter')
const TimeKeepingRouter = require('./TimeKeepingRouter')
const CategoryRouter = require('./CategoeyRouter')

const routes = (app) => {
    app.use('/api/user', UserRouter); // Gán đường dẫn /api/user cho UserRouter
    app.use('/api/product', ProductRouter);
    app.use('/api/cart', CartRouter);
    app.use('/api/category', CategoryRouter);
    app.use('/api/order', OrderRouter);
    app.use('/api/timekeeping', TimeKeepingRouter);
};
module.exports = routes;
