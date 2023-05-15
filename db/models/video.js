const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    static associate(models) {
      this.belongsTo(models.user, { foreignKey: "user_id" });
      this.belongsTo(models.itinerary, { foreignKey: "itinerary_id" });
      this.hasMany(models.like, { foreignKey: "video_id" });
      this.hasMany(models.comment, { foreignKey: "video_id" });
    }
  }

  Video.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      video_url: {
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
      modelName: "video",
      underscored: true,
    }
  );
  return Video;
};
