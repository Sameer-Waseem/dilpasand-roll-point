const mongoose = require("mongoose");
const Joi = require("joi");
const validateRating = require("../utils/validateRating");
const validateCategoryId = require("../utils/validateCategoryId");

const productSchema = new mongoose.Schema({
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  name: {
    type: String,
    minLength: 3,
    maxLength: 255,
    required: true,
  },
  price: {
    type: Number,
    min: 10,
    max: 2000,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
    validate: {
      validator: function (v) {
        const numbersAfterDecimal = v.toString().split(".")[1];
        return numbersAfterDecimal && numbersAfterDecimal.length > 1
          ? false
          : true;
      },
      message: "Rating should have only one digit after decimal",
    },
  },
});

const Product = mongoose.model("Product", productSchema);

function validatePostRequest(req) {
  const schema = Joi.object({
    category_id: Joi.string().required().custom(validateCategoryId),
    name: Joi.string().min(3).max(255).required(),
    price: Joi.number().min(10).max(2000).required(),
    rating: Joi.number().min(0).max(5).custom(validateRating),
  });

  return schema.validate(req);
}

function validateGetRequest(req) {
  const schema = Joi.object({
    category_id: Joi.string().custom(validateCategoryId),
    name: Joi.string(),
    order_by: Joi.string().valid(
      "name_asc",
      "name_desc",
      "price_asc",
      "price_desc"
    ),
  });

  return schema.validate(req);
}

exports.Product = Product;
exports.validatePostRequest = validatePostRequest;
exports.validateGetRequest = validateGetRequest;
