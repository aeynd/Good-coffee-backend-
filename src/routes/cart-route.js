const express = require("express");

const cartController = require("../controllers/cart-controller");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.get("/itemincart", authenticate, cartController.getAllItemInCart);
router.post("/addtocart", authenticate, cartController.addToCart);
router.patch("/updateinccart", authenticate, cartController.updateIncCart);
router.patch("/updatedeccart", authenticate, cartController.updateDecCart);
router.delete("/:cartId", authenticate, cartController.deleteProductInCart);

router.get("/payment",cartController.getSlipImg)
router.post("/",authenticate,cartController.checkout)

router.delete("/:productId",authenticate,cartController.checkout)

module.exports = router;
