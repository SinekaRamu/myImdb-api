module.exports = function model(sequelize, Sequelize) {
  const ratings = sequelize.define(
    "ratings",
    {
      rating_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primarykey: true,
        unique: true,
      },
      rating: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "users",
          },
          key: "user_id",
        },
        allowNull: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      movie_id: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "movies",
          },
          key: "movie_id",
        },
        allowNull: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },

    {
      tableName: "ratings",
      timestamps: false,
    }
  );

  return ratings;
};
