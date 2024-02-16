const express = require("express");
const { Category, validate } = require("../schema/categorySchema");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).send({ categories });
  } catch (error) {
    return res.status(400).send({ error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Invalid id.");
    }

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).send("Category not found.");
    }

    return res.status(200).send({ category });
  } catch (error) {
    return res.status(400).send({ error });
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }

    const category = new Category(req.body);
    await category.save();

    return res.status(200).send({ category });
  } catch (error) {
    return res.status(400).send({ error });
  }
});

exports.categoryRouter = router;
