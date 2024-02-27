const mongoose = require("mongoose");
const express = require("express");
const { Category } = require("../schema/categorySchema");
const getOrderBy = require("../utils/getOrderBy");
const {
  validatePostRequest,
  Product,
  validateGetRequest,
} = require("../schema/productSchema");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { error } = validateGetRequest(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    let findObj = {};
    let sortObj = {};

    if (req.body.name) {
      findObj["name"] = new RegExp(req.body.name, "i");
    }

    if (req.body.category_id) {
      findObj["category_id"] = req.body.category_id;
    }

    if (req.body.order_by) {
      const { sortingName, sortingDirection } = getOrderBy(req.body.order_by);
      sortObj = {
        [sortingName]: sortingDirection,
      };
    }

    const products = await Product.find(findObj)
      .populate("category_id", "name")
      .sort(sortObj)
      .select("name price rating");

    const response = [
      ...products.map((product) => ({
        _id: product._id,
        category_id: product.category_id._id,
        name: product.name,
        price: product.price,
        rating: product.rating,
        category: product.category_id.name,
      })),
    ];

    return res.status(200).send({ products: response });
  } catch (error) {
    return res.status(400).send("Internal server error");
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
    return res.status(400).send("Internal server error");
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
    return res.status(400).send("Internal server error");
  }
});

exports.productRouter = router;
