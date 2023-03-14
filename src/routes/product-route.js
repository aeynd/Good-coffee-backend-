const express = require("express");

const productController = require("../controllers/product-controller");
const authenticate = require("../middlewares/authenticate");
const upload = require("../middlewares/upload");

const router = express.Router();

router.get("/product", productController.getAllProduct);
router.get("/shop/:productId", productController.productInfo);
router.post("/postproduct", authenticate, upload.single("image"), productController.createProduct);
router.delete("/:productId", authenticate, productController.deleteProduct);
router.patch("/:productId", authenticate, productController.updateProduct);

module.exports = router;
