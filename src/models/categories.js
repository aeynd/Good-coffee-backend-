module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define(
    "Categories",
    {
      catagoryTitle: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      }
    },
    { underscored: true }
  );

  Categories.associate = db => {
    Categories.hasMany(db.Product, {
      foreignKey: {
        name: "categoriesId",
        allowNull: false
      },

    });
  };
  return Categories;
};
