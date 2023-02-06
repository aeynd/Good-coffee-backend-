module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      payment: {
        type: DataTypes.STRING,
        validate: {
          allowNull: false
        }
      }
    },
    { underscored: true }
  );
  Order.associate = db => {
    Order.hasMany(db.OrderItem, {
      foreignKey: {
        name: "orderId",
        allowNull: false
      }
    });
    Order.belongsTo(db.Product, {
      foreignKey: {
        name: "productId",
        allowNull: false
      }
    });
  };
  return Order;
};
