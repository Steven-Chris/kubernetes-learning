"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("request_log", "count");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("request_log", "count", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
};
