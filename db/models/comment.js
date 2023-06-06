const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      this.belongsTo(models.user, { as: "user", foreignKey: "user_id" });
      this.belongsTo(models.photo, { foreignKey: "photo_id" });
      this.belongsTo(models.video, { foreignKey: "video_id" });
      this.belongsTo(models.itinerary, {
        as: "itinerary",
        foreignKey: "itinerary_id",
      });
    }
  }

  Comment.init(
    {
      remark: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      star_rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
    },
    {
      sequelize,
      modelName: "comment",
      underscored: true,
    }
  );

  return Comment;
};
