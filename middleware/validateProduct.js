const { ValidationError } = require("../utils/errors");

const validateProduct = (req, res, next) => {
  const { name, description, price, category } = req.body;

  if (!name || !description || !price || !category) {
    throw new ValidationError("All required fields must be provided");
  }

  if (typeof price !== "number" || price <= 0) {
    throw new ValidationError("Price must be a positive number");
  }

  next();
};

module.exports = validateProduct;
