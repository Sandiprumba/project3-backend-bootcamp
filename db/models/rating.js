const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    static associate(models) {
      this.belongsTo(models.user, { foreignKey: "user_id" });
      this.belongsTo(models.itinerary, { foreignKey: "itinerary_id" });
    }
  }
  Rating.init(
    {
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      itinerary_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "itineraries",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "rating",
      underscored: true,
    }
  );
  return Rating;
};
