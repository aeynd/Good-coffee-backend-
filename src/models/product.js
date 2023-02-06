module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      title: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      },
      image: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      },
      price: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      }
    },
    { underscored: true }
  );
  Product.associate = db => {
    Product.hasMany(db.Order, {
      foreignKey: {
        name: "productId",
        allowNull: false
      }
    });

    Product.belongsTo(db.Roaster, {
      foreignKey: {
        name: "roasterId",
        allowNull: false
      }
    });
    Product.belongsTo(db.Categories, {
      foreignKey: {
        name: "categoriesrId",
        allowNull: false
      }
    });
  };
  return Product;
};
