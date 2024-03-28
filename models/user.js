"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      access_token: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: "users",
      timestamps: true,
    }
  );

  //   User.associate = function (models) {
  //     User.hasMany(models.Book, {
  //       foreignKey: {
  //         name: "id_user",
  //         type: DataTypes.INTEGER,
  //         allowNull: false,
  //       },
  //     });
  //   };

  return User;
};
