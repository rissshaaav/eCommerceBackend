const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

app.use(express.json());


app.get("/", (req, res) => {
  res.send("Server is working atleast!");
});

const userRouter = require("./routes/user.route");
const errorHandler = require("./middlewares/errorHandler.middleware");
const productRouter = require("./routes/product.route");
const cartRouter = require("./routes/cart.route");
const orderRouter = require("./routes/order.route");

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server is up. at ", PORT);
  mongoose.connect(MONGO_URL).then(() => {
    console.log("connected to db");
  });
});
