const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    static associate(models) {
      this.belongsTo(models.user, { foreignKey: "user_id" });
      this.hasMany(models.comment, { foreignKey: "video_id" });
    }
  }

  Video.init(
    {
      title: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      video_url: {
        type: DataTypes.STRING,
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
      modelName: "video",
      underscored: true,
    }
  );

  return Video;
};
