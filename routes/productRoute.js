const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const { NotFoundError } = require("../utils/errors");
const validateProduct = require("../middleware/validateProduct");

// GET /api/products - List all products 
router.get("/", async (req, res, next) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const filter = category ? { category } : {};

    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json(products);
  } catch (error) {
    next(error);
  }
});

// GET /api/products/:id - Get specific product
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) throw new NotFoundError("Product not found");
    res.json(product);
  } catch (error) {
    next(error);
  }
});

// POST /api/products - Create new product
router.post("/", validateProduct, async (req, res, next) => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (error) {
    next(error);
  }
});

// PUT /api/products/:id - Update product
router.put("/:id", validateProduct, async (req, res, next) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) throw new NotFoundError("Product not found");
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/products/:id - Delete product
router.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) throw new NotFoundError("Product not found");
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
});

// GET /api/products/search?q=name - Search by name
router.get("/search/query", async (req, res, next) => {
  try {
    const q = req.query.q || "";
    const products = await Product.find({ name: { $regex: q, $options: "i" } });
    res.json(products);
  } catch (error) {
    next(error);
  }
});

// GET /api/products/stats - Product statistics (count by category)
router.get("/stats/category", async (req, res, next) => {
  try {
    const stats = await Product.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);
    res.json(stats);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
