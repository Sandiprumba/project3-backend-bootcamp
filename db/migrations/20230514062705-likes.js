"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("likes", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      itinerary_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "itineraries",
          key: "id",
        },
      },
      photo_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "photos",
          key: "id",
        },
        allowNull: true,
      },
      video_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "videos",
          key: "id",
        },
        allowNull: true,
      },
      blog_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "blogs",
          key: "id",
        },
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });
  },

  async down(queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("likes");
  },
};
