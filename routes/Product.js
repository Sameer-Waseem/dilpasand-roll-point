const express = require("express");
const {
  validatePostRequest,
  Product,
  validateGetRequest,
} = require("../schema/productSchema");
const { Category } = require("../schema/categorySchema");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { error } = validateGetRequest(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const products = await Product.find()
      .populate("category_id", "name")
      .select("name price rating");

    return res.status(200).send({ products });
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Invalid id");
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).send("Product with the given doesn't exist");
    }

    return res.status(200).send({ product });
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = validatePostRequest(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const category = await Category.findById(req.body.category_id);
    if (!category) {
      return res.status(404).send("Category with the given id doesn't exist");
    }

    const product = new Product(req.body);
    await product.save();

    return res.status(200).send({ product });
  } catch (error) {
    return res.status(400).send(error);
  }
});

exports.productRouter = router;
