const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    static associate(models) {
      this.belongsTo(models.user, { foreignKey: "user_id" });
    }
  }

  Blog.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        defauleValue: new Date(),
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
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
