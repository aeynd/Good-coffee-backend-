module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      mobile: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          is: /^[0-9]{10}$/
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true
      },
      role: {
        type: DataTypes.ENUM("user", "admin"),
        defaultValue: "user"
      },
      profileImage: DataTypes.STRING
    },
    { underscored: true }
  );

  User.associate = db => {
    User.hasMany(db.Order, {
      foreignKey: {
        name: "userId",
        allowNull: false
      }
    });

    User.hasMany(db.Cart, {
      foreignKey: {
        name: "userId",
        allowNull: false
      }
    });
  };
  return User;
};
