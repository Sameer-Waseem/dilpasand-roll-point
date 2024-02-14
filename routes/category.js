const express = require("express");
const { Cateogry, validateCategory } = require("../schema/categorySchema");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categories = await Cateogry.find();
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

    const category = await Cateogry.findById(id);
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
    const { error } = validateCategory(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }

    const cateogry = new Cateogry(req.body);
    await cateogry.save();

    return res.status(200).send({ cateogry });
  } catch (error) {
    return res.status(400).send({ error });
  }
});

exports.router = router;
