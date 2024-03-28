"use strict";

module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    "Book",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      book_title: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      book_author: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      book_description: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      book_year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "Books",
      timestamps: true,
    }
  );

  return Book;
};
