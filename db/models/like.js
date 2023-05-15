const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      this.belongsTo(models.user, { foreignKey: "user_id" });
      this.belongsTo(models.itinerary, { foreignKey: "itinerary_id" });
      this.belongsTo(models.photo, { foreignKey: "photo_id" });
      this.belongsTo(models.video, { foreignKey: "video_id" });
      this.belongsTo(models.blog, { foreignKey: "blog_id" });
    }
  }
  Like.init(
    {
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
      photo_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "photos",
          key: "id",
        },
      },
      video_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "videos",
          key: "id",
        },
      },
      blog_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "blogs",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "like",
      underscored: true,
    }
  );
  return Like;
};
