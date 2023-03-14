const { ORDER_PENDING, ORDER_SUCCESS, ORDER_REJECT } = require("../config/constant");

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      paymentImg: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      status: {
        type: DataTypes.ENUM(ORDER_PENDING, ORDER_SUCCESS, ORDER_REJECT),
        allowNull: false,
        defaultValue: ORDER_PENDING
      },
      totalPrice: {
        type: DataTypes.FLOAT(10, 2),
        allowNull: true
      }
    },
    { underscored: true }
  );
  
  Order.associate = db => {
    Order.hasMany(db.OrderItem, {
      foreignKey: {
        name: "orderId",
        allowNull: false
      },

    });
    Order.belongsTo(db.User, {
      foreignKey: {
        name: "userId",
        allowNull: false
      },

    });
  };
  return Order;
};
