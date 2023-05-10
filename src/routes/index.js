const categoryRouter = require('./category');
const productRouter = require('./product');
const userRouter = require('./user');
const authRouter = require('./auth');
const cartRouter = require('./cart');
const blogRouter = require('./blog');
const locationRouter = require('./location');
const storeRouter = require('./store');

function route(app) {
    app.use('/api/blog',blogRouter);
    app.use('/api/category',categoryRouter);
    app.use('/api/product',productRouter);
    app.use('/api/user',userRouter);
    app.use('/api/auth',authRouter);
    app.use('/api/cart',cartRouter);
    app.use('/api/location',locationRouter);
    app.use('/api/store',storeRouter);
}

module.exports = route;