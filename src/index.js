require('dotenv').config();
const express = require('express');
const cors = require('cors');

const router = require('./routes/router');
const product = require('./routes/product');
const user = require('./routes/user');
const media = require('./routes/media')

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: true, credentials: true }));

app.use('/', router);

app.use('/stores', user.storeRoute);

app.use('/categories', product.CategoryRoutes);
app.use('/products', product.ProductRoutes);

app.use('/images', media.mediaRouter)
app.use('./Images', express.static('./Images'))


app.listen(process.env.SERVER_PORT, () => {
  console.log('Server Running');
});
