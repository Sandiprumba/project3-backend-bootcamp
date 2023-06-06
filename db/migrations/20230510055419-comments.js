("use strict");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("comments", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      remark: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      star_rating: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      itinerary_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "itineraries",
          key: "id",
        },
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
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
    await queryInterface.dropTable("comments");
  },
};
