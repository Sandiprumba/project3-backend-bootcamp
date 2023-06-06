const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.itinerary, { foreignKey: "user_id" });
      this.hasMany(models.blog, { as: "blogs", foreignKey: "user_id" });
      this.hasMany(models.photo, { as: "photos", foreignKey: "user_id" });
      this.hasMany(models.video, { as: "videos", foreignKey: "user_id" });
      this.hasMany(models.comment, { foreignKey: "user_id" });
    }
  }

  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bio: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      profile_picture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "user",
      underscored: true,
      timestamps: true,
    }
  );
  return User;
};
