const fs = require("fs");

const { validateRegister, validateLogin } = require("../validators/auth-validator");
const { validateUploadSlip } = require("../validators/payment-validator");
const { User, Order } = require("../models");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createError = require("../utils/create-error");
const cloudinary = require("../utils/cloudinary");

exports.register = async (req, res, next) => {
  try {
    const value = validateRegister(req.body);
    const user = await User.findOne({ where: { email: value.email } });
    if (user) {
      createError("email is already in use", 400);
    }
    value.password = await bcrypt.hash(value.password, 12);
    await User.create(value);

    res.status(201).json({ message: "register success. please log in to continue." });
  } catch (err) {
    next(err);
  }
};
exports.login = async (req, res, next) => {
  try {
    const value = validateLogin(req.body);
    const user = await User.findOne({ where: { email: value.email } });
    if (!user) {
      createError("invalid email or password", 400);
    }
    const isCorrect = await bcrypt.compare(value.password, user.password);
    if (!isCorrect) {
      createError("invalid email or password", 400);
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profileImage: user.profileImage,
        address: user.address,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN
      }
    );

    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};

exports.getMe = (req, res, next) => {
  res.status(200).json({ user: req.user });
};

exports.uploadPayment = async (req, res, next) => {
  try {
    const slipPayment = await cloudinary.upload(req.file?.path);
    const order = await Order.create({
      userId: req.user.id,
      paymentImg: slipPayment,
      totalPrice: req.body.totalPrice
    });

    console.log(order);
    res.status(201).json({ order });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};

// exports.statusConfirm = async (req, res, next) => {
//   try {
//     console.log(req.body);
//     // const confirm = await Order.update(
//     //   { status: req.body.status }
//     //   ,
//     //   { where: { id: req.body.id } });

//     res.status(200).json({ message: "status update" });
//   } catch (err) {
//     next(err);
//   }
// };

// exports.statusConfirm = async (req, res, next) => {
//   try {
//     console.log(req.body);
//     const confirm = await Order.update({ status: req.body.status }, { where: { id: req.body.id } });
//     res.status(200).json({ message: "Update success" });
//   } catch (err) {
//     next(err);
//   }
// };
