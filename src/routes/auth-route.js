const express = require("express");
const authController = require("../controllers/auth-controller");
const authenticate = require("../middlewares/authenticate");
const upload = require("../middlewares/upload");
const {Order } = require("../models")

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authenticate, authController.getMe);
router.post("/payment", authenticate, upload.single("paymentImg"), authController.uploadPayment);

router.patch("/statusUpdate", authenticate, async (req, res, next) => { 
    // console.log(req.body)
    // next()
    const confirm = await Order.update(
      { status: req.body.status }
      ,
        { where: { id: req.body.id } });
    res.status(200).json({message:" update success"})
})

module.exports = router;
