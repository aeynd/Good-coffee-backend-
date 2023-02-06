module.exports = (sequelize, DataTypes) => {
  const Roaster = sequelize.define(
    "Roaster",
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
      }
    },
    { underscored: true }
  );

  Roaster.associate = db => {
    Roaster.hasMany(db.Product, {
      foreignKey: {
        name: "roasterId",
        allowNull: false
      }
    });
  };

  return Roaster;
};
