const fs = require("fs");
const { STATUS_ADMIN } = require("../config/constant");
const { User, Product, Categories, Roaster } = require("../models");
const cloudinary = require("../utils/cloudinary");
const createError = require("../utils/create-error");
const { validateCreateProduct } = require("../validators/product-validator");

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
      include: [{ model: Roaster }, { model: Categories }]
    });

    res.status(201).json({ products });
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    if (req.user.role !== STATUS_ADMIN) {
      res.status(401).json({
        message: "You are unathorized"
      });
    }
    const product = await Product.findOne({
      where: { id: req.params.productId }
    });

    if (!product) {
      createError("this product was not found", 400);
    }
    await product.destroy({ message: "This product was delete" });
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    if (req.user.role !== STATUS_ADMIN) {
      res.status(401).json({
        message: "You are unathorized"
      });
    }
    const productImage = await cloudinary.upload(req.file?.path);
    const categories = await Categories.create({
      catagoryTitle: req.body.catagoryTitle
    });
    const roasters = await Roaster.create({
      roasterTitle: req.body.roasterTitle
    });
    const product = await Product.create({
      title: req.body.title,
      image: productImage,
      price: req.body.price,
      categoriesId: categories.id,
      roasterId: roasters.id
    });

    console.log("create product", req.body);
    res.status(201).json({ product });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    if (req.user.role !== STATUS_ADMIN) {
      res.status(401).json({
        message: "You are unathorized"
      });
    }

    const productId = req.params.productId;
    const product = await Product.findOne({
      where: { id: productId },
      include: [{ model: Roaster }, { model: Categories }]
    });

    if (!product) {
      createError("this product was not found", 400);
    }

    await product.update({
      title: req.body.title,
      price: req.body.price
    });
    res.status(200).json({ product, message: "update product success" });
  } catch (err) {
    next(err);
  }
};

