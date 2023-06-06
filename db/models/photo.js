"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    static associate(models) {
      this.belongsTo(models.user, { foreignKey: "user_id" });
    }
  }

  Photo.init(
    {
      title: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      image_url: {
        type: DataTypes.STRING,
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
      modelName: "photo",
      underscored: true,
    }
  );

  return Photo;
};
