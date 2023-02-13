module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    "Cart",
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
  Cart.associate = db => {
    Cart.belongsTo(db.User, {
      foreignKey: {
        name: "userId",
        allowNull: false
      }
    });
    Cart.belongsTo(db.Product, {
      foreignKey: {
        name: "productId",
        allowNull: false
      }
    });
  };
  return Cart;
};
