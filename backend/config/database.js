const mongoose = require("mongoose");


const connectToDatabase = () => {

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
  })
  .then((data) => {
    console
      .log(`Connected with MongoDB server: ${data.connection.host}`)})
      .catch((err) => {
        console.log(err);
      });


}

module.exports = connectToDatabase

