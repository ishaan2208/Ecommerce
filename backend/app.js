const express = require("express");
const cookieParser = require("cookie-parser")

const app = express();

const errorMiddleware = require("./middleware/error");

//* Middleware

app.use(express.json());
app.use(cookieParser())

// * Middleware For Error

app.use(errorMiddleware);

//* Routes
const user = require("./routes/userRoutes");
const product = require("./routes/productRoutes");
const order = require("./routes/orderRoutes")

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1",order);


module.exports = app;
