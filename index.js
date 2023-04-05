const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 8000;



mongoose
  .connect("mongodb://127.0.0.1:27017/app", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoIndex: true,
  })
  .then(() => {
    console.log("Database connected!");
    app.listen(PORT, () => {
      console.log(`Server listening on PORT ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});
