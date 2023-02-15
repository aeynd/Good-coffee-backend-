const express = require("express");

const productController = require("../controllers/product-controller");

const router = express.Router();

router.get("/product", productController.getAllProduct);
router.get("/shop/:productId", productController.productInfo);


module.exports = router;
