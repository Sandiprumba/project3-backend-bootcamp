const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      this.belongsTo(models.user, { as: "user", foreignKey: "user_id" });
      this.belongsTo(models.itinerary, { foreignKey: "itinerary_id" });
      this.belongsTo(models.photo, { foreignKey: "photo_id" });
      this.belongsTo(models.video, { foreignKey: "video_id" });
      this.belongsTo(models.blog, { foreignKey: "blog_id" });
    }
  }

  Like.init(
    {
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
      modelName: "like",
      underscored: true,
    }
  );

  return Like;
};
