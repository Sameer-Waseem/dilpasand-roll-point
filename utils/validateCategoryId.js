const mongoose = require("mongoose");

function validateCategoryId(value) {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    throw new Error("Invalid category id.");
  }

  return value;
}

module.exports = validateCategoryId;
