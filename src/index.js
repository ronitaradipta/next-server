require('dotenv').config();
const express = require('express');
const cors = require('cors');

const router = require('./routes/router');
const categoryRoute = require('./routes/product/CategoryRouter');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: true, credentials: true }));

app.use('/', router);
app.use('/category', categoryRoute);

app.listen(process.env.SERVER_PORT, () => {
  console.log('Server Running');
});
