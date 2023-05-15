const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    static associate(models) {
      this.belongsTo(models.user, { foreignKey: "user_id" });
      this.belongsTo(models.itinerary, { foreignKey: "itinerary_id" });
      this.hasMany(models.like, { foreignKey: "photo_id" });
      this.hasMany(models.comment, { foreignKey: "photo_id" });
    }
  }
  Photo.init(
    {
      image_url: {
        type: DataTypes.STRING,
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
      modelName: "photo",
      underscored: true,
    }
  );
  return Photo;
};
