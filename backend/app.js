const express = require("express");

const app = express();

const errorMiddleware = require("./middleware/error");

//* Middleware

app.use(express.json());

// * Middleware For Error

app.use(errorMiddleware);

//* Routes
const product = require("./routes/productRoutes");
const user = require("./routes/userRoutes");

app.use("/api/v1", product);
app.use("/api/v1", user);

module.exports = app;
