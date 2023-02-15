const express = require("express");
const authController = require("../controllers/auth-controller");
const authenticate = require("../middlewares/authenticate");
const upload = require('../middlewares/upload')

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authenticate, authController.getMe);
router.post('/payment',authenticate,upload.single('paymentImg'),authController.uploadPayment)


module.exports = router;
