module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    'Book',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      bookTitle: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      bookAuthor: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      bookDescription: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      bookYear: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'Books',
      timestamps: true,
    },
  );

  return Book;
};
