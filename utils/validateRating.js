function validateRating(value) {
  const numbersAfterDecimal = value.toString().split(".")[1];

  if (numbersAfterDecimal && numbersAfterDecimal.length > 1) {
    throw new Error("Rating should have only one digit after decimal");
  }

  return value;
}

module.exports = validateRating;
