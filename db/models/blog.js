const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    static associate(models) {
      this.belongsTo(models.user, { foreignKey: "user_id" });
      this.hasMany(models.comment, { foreignKey: "blog_id" });
    }
  }
  Blog.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
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
      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "blog",
      underscored: true,
    }
  );
  return Blog;
};
