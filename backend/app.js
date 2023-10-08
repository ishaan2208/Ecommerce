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
const product = require("./routes/productRoutes");
const user = require("./routes/userRoutes");

app.use("/api/v1", product);
app.use("/api/v1", user);

module.exports = app;
