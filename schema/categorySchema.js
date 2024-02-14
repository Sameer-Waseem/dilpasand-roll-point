const mongoose = require("mongoose");
const Joi = require("joi");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 255,
  },
});

const Cateogry = mongoose.model("Cateogry", categorySchema);

function validateCategory(req) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
  });

  return schema.validate(req);
}

exports.Cateogry = Cateogry;
exports.categorySchema = categorySchema;
exports.validateCategory = validateCategory;
