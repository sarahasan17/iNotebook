const connectToMongo = require("./db");
const express = require("express");
connectToMongo();
var cors = require("cors");
var app = express();
app.use(cors());
const port = 5000;
app.use(express.json())
app.use('/api/auth',require('./routes/auth.js'))
app.use("/api/notes", require("./routes/notes.js"));
app.listen(port, () => {
  console.log(`iNotebook backend started on port ${port}`);
});
