const express = require("express");

const cartController = require("../controllers/cart-controller");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.get("/itemincart", authenticate, cartController.getAllItemInCart);
router.post("/addtocart", authenticate, cartController.addToCart);
router.patch("/updateinccart", authenticate, cartController.updateIncCart);
router.patch("/updatedeccart", authenticate, cartController.updateDecCart);
router.delete("/:cartId", authenticate, cartController.deleteProductInCart);

module.exports = router;
