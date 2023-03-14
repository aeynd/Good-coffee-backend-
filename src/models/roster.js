module.exports = (sequelize, DataTypes) => {
  const Roaster = sequelize.define(
    "Roaster",
    {
      roasterTitle: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      },
      image: {
        type: DataTypes.STRING
      }
    },
    { underscored: true }
  );

  Roaster.associate = db => {
    Roaster.hasMany(db.Product, {
      foreignKey: {
        name: "roasterId",
        allowNull: false
      },

    });
  };

  return Roaster;
};
