const fs = require("fs");
const { User, Product, Categories, Roaster } = require("../models");
const cloudinary = require("../utils/cloudinary");
const createError = require("../utils/create-error");
const { validateCreateProduct } = require("../validators/product-validator");

exports.createProduct = async (req, res, next) => {
  try {
    const value = validateCreateProduct({
      title: req.body.title,
      image: req.file?.path,
      price: req.body.price
    });
    if (value.image) {
      value.image = await cloudinary.upload(value.image);
    }

    value.productId = req.product.id;

    const product = await Product.create(value);
    res.status(201).json({ product });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};

exports.getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
};

exports.productInfo = async (req, res, next) => {
  try {
    const productId = req.params.productId;

    const products = await Product.findOne({
      where: { id: productId },
      include: { model: Roaster, Categories }
    });

    res.status(201).json({ products });
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: { id: req.params.productId }
    });

    if (!product) {
      createError("this product was not found", 400);
    }
    // if (product.productId !== req.product.id) {
    //   createError('',403);
    // }
    await product.destroy();
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
