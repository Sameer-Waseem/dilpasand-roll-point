const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { categoryRouter } = require("./routes/category");
const { productRouter } = require("./routes/product");

mongoose
  .connect("mongodb://localhost/dipasand-roll-point")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((e) => console.log("Could not connect to MongoDB...", e));

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
