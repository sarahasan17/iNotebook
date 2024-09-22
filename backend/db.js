const mongoose = require("mongoose");
mongoURI = "mongodb://localhost:27017";

const connectToMongo = () => {
  mongoose
    .connect(mongoURI)
    .then(() => console.log("Connected"))
    .catch((e) => console.log(e.message));
};

module.exports = connectToMongo;
