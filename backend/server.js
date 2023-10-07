const app = require("./app");


//* Cofig file

const dotenv = require("dotenv");
dotenv.config({path:"backend/config/config.env"})

app.listen(process.env.PORT,() => {
    console.log(`server is live on http://localhost:${process.env.PORT}`)
})