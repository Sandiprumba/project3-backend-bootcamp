"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.sequelize.query(
      "ALTER SEQUENCE itineraries_id_seq RESTART WITH 1"
    );
    await queryInterface.bulkInsert("itineraries", [
      {
        name: "Everest Base Camp",
        description:
          "Everest Base Camp is a renowned trekking destination located in the Khumbu region of Nepal. Situated at an elevation of approximately 5,364 meters (17,598 feet), it serves as the starting point for climbers attempting to summit Mount Everest, the world's highest peak. The trek to Everest Base Camp offers breathtaking views of towering Himalayan peaks, including Everest, as well as a chance to experience the unique culture of the Sherpa people who call this region home. The journey to the base camp involves traversing through picturesque valleys, dense forests, crossing thrilling suspension bridges, and staying at traditional teahouses along the way. It is a challenging yet immensely rewarding adventure, attracting trekkers from around the world who seek to witness the grandeur of the Himalayas and immerse themselves in the rugged beauty of the Everest region.",
        duration: 14,
        difficulty: "moderate",
        region: "Solukhumbu Region",
        altitude: 5400,
        cost: 1400,
        image_url:
          "https://www.istockphoto.com/photo/sunset-on-mount-everest-gm155154584-18708120?utm_source=unsplash&utm_medium=affiliate&utm_campaign=srp_photos_top&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Feverest&utm_term=everest%3A%3A%3A",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("itineraries", null, {});
  },
};
