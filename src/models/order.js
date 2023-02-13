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
    {
      updateDate: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {
      status: {
        type: DataTypes.ENUM("pending", "success"),
        defaultValue: "pending"
      }
    },
    {
      totalPrice: {
        type: DataTypes.FLOAT(10, 2),
        allowNull: false
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
    Order.belongsTo(db.User, {
      foreignKey: {
        name: "userId",
        allowNull: false
      }
    });
  };
  return Order;
};
