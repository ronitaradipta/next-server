require('dotenv').config();
const express = require('express');
const cors = require('cors');

const router = require('./routes/router');
const categoryRoute = require('./routes/product/CategoryRouter');
const productRoute = require('./routes/product/ProductRoutes');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: true, credentials: true }));

app.use('/', router);

app.use('/category', categoryRoute);

app.use('/product', productRoute);

app.listen(process.env.SERVER_PORT, () => {
  console.log('Server Running');
});
