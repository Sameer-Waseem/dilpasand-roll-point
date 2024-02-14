const express = require("express");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/dipasand-roll-point")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((e) => console.log("Could not connect to MongoDB...", e));

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
