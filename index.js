const express = require("express");
const mongoose = require("mongoose");
const { router } = require("./routes/category");

mongoose
  .connect("mongodb://localhost/dipasand-roll-point")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((e) => console.log("Could not connect to MongoDB...", e));

const app = express();

app.use(express.json());
app.use("/api/category", router);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
