const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Itinerary extends Model {
    static associate(models) {
      this.belongsTo(models.user, { foreignKey: "user_id" });
      this.hasMany(models.photo, { foreignKey: "itinerary_id" });
      this.hasMany(models.video, { foreignKey: "itinerary_id" });
      this.hasMany(models.comment, { foreignKey: "itinerary_id" });
      this.hasMany(models.like, { foreignKey: "itinerary_id" });
    }
  }
  Itinerary.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      duration: DataTypes.INTEGER,
      difficulty: DataTypes.STRING,
      region: DataTypes.STRING,
      altitude: DataTypes.INTEGER,
      cost: DataTypes.INTEGER,
      image_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "itinerary",
      underscored: true,
    }
  );

  return Itinerary;
};
