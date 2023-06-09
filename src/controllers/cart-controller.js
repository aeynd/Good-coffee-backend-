const fs = require("fs");
const { Cart, Product, OrderItem, Order } = require("../models");
const createError = require("../utils/create-error");

exports.getAllItemInCart = async (req, res, next) => {
  try {
    const carts = await Cart.findAll({
      where: { userId: req.user.id },
      include: { model: Product }
    });
    res.status(200).json({ carts });
  } catch (err) {
    next(err);
  }
};

exports.addToCart = async (req, res, next) => {
  try {
    const sameProductInCart = await Cart.findOne({
      where: {
        productId: req.body.productId,
        userId: req.user.id
      }
    });
    if (sameProductInCart) {
      await Cart.update(req.body, {
        where: { productId: req.body.productId }
      });
      return res.status(200).json({ message: "already" });
    }

    const createAddToCart = await Cart.create({
      amount: 1,
      productId: req.body.productId,
      userId: req.user.id
    });

    res.status(200).json({ createAddToCart, message: "add product success" });
  } catch (err) {
    next(err);
  }
};

exports.updateIncCart = async (req, res, next) => {
  try {
    // console.log(req.body.cartId);

    const { amount } = await Cart.findOne({
      where: {
        id: req.body.cartId
      },

      raw: true
    });

    const increaseProductInCart = await Cart.update(
      {
        amount: +amount + 1
      },
      {
        where: { id: req.body.cartId }
      }
    );

    res.status(200).json({
      increaseProductInCart,
      message: "update increase product success"
    });
  } catch (err) {
    next(err);
  }
};
exports.updateDecCart = async (req, res, next) => {
  try {
    const { amount } = await Cart.findOne({
      where: { id: req.body.cartId },
      raw: true
    });

    if (amount > 0) {
      const decreaseProductInCart = await Cart.update(
        {
          amount: +amount - 1
        },
        {
          where: { id: req.body.cartId }
        }
      );
      return decreaseProductInCart;
    }

    res.status(200).json({
      decreaseProductInCart,
      message: "update decrease product success"
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteProductInCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: { id: req.params.cartId }
    });
    console.log(cart);
    await cart.destroy();
    res.status(204).json({ message: "delete!!!" });
  } catch (err) {
    next(err);
  }
};

exports.getSlipImg = async (req, res, next) => {
  try {
    const slip = await Order.findAll({
      // where: { userId: req.user.id }
    });
    res.status(200).json({ slip });
  } catch (err) {
    next(err);
  }
};

exports.checkout = async (req, res, next) => {
  try {
    const deleteProductCheckout = await Cart.findOne({
      where: { productId: req.params.id, userId: req.user.id }
    });
    const allProductInCart = await Cart.findAll({
      where: { user: req.user.id },
      include: { model: Product }
    });
    await deleteProductCheckout.destroy();
    res.status(200).json({ allProductInCart });
  } catch (err) {
    next(err);
  }
};
