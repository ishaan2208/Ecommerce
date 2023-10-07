const app = require("./app");

//* Cofig file

const dotenv = require("dotenv");
dotenv.config({ path: "backend/config/config.env" });

//* Handling Uncaught Exception

process.on("uncaughtException",(err) => {
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down server due uncaught exception`)
})

//* Connecting To Database

const connectToDatabase = require("./config/database");
connectToDatabase();

app.listen(process.env.PORT, () => {
  console.log(`server is live on http://localhost:${process.env.PORT}`);
});

//* Unhandled Promise Rejection

process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log(`Shutting down the server due to unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
