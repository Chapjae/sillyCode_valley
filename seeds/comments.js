module.exports = {
  up: async (queryInterface, Sequelize) => {
    const commentsData = [
      {
        text: "This is a great video.",
        userId: 1,
        videoId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        text: "Awesome content, keep up the great work!",
        userId: 2,
        videoId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        text: "My grandma can act better than you!",
        userId: 3,
        videoId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        text: "It was alright, say it with your chest!!",
        userId: 4,
        videoId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        text: "This is going to help me with my upcoming role! Thank you!",
        userId: 5,
        videoId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        text: "You still have time to delete this! ",
        userId: 6,
        videoId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ];

    await queryInterface.bulkInsert('Comments', commentsData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Comments', null, {});
  }
};
