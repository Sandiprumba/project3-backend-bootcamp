const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.itinerary, { foreignKey: "user_id" });
      this.hasMany(models.blog, { foreignKey: "user_id" });
      this.hasMany(models.photo, { foreignKey: "user_id" });
      this.hasMany(models.video, { foreignKey: "user_id" });
      this.hasMany(models.like, { foreignKey: "user_id" });
      this.hasMany(models.comment, { foreignKey: "user_id" });
    }
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profilePicture: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bio: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "user",
      underscored: true,
    }
  );
  return User;
};
