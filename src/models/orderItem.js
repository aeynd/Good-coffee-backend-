module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    "OrderItem",
    {
      amount: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      },
      totalPrice: {
        type: DataTypes.FLOAT(10, 2),
        validate: {
          notEmpty: true
        }
      }
    },
    { underscored: true }
  );
  OrderItem.associate = db => {
    OrderItem.belongsTo(db.User, {
      foreignKey: {
        name: "userId",
        allowNull: false
      }
    })
      
    OrderItem.belongsTo(db.Order, {
      foreignKey: {
        name: "orderId",
        allowNull: false
      }
    })
  };
  
  
  return OrderItem;
};
