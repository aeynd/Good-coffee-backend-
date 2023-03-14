module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    "OrderItem",
    {
      amount: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      }
    },
    { underscored: true }
  );
  OrderItem.associate = db => {
    OrderItem.belongsTo(db.Product, {
      foreignKey: {
        name: "productId",
        allowNull: false
      },

    });

    OrderItem.belongsTo(db.Order, {
      foreignKey: {
        name: "orderId",
        allowNull: false
      },

    });
  };

  return OrderItem;
};
