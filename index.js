require("dotenv").config();
const express = require("express");
const cors = require("cors");

const router = require("./routes/router");
const product = require("./routes/product");
const user = require("./routes/user");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: true, credentials: true }));

app.use("/", router);

app.use("/stores", user.storeRoute);

app.use("/categories", product.CategoryRoutes);
app.use("/products", product.ProductRoutes);

// added new : Fiqri Oemry
app.use("/", user.AuthRoute);
app.use("/", user.UserRoute);
app.use("/", user.AddressRoute);

app.listen(process.env.SERVER_PORT, () => {
  console.log("Server Running");
});
