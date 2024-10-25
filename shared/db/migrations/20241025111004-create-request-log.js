"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("request_log", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      request: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      api: {
        type: Sequelize.ENUM("alpha", "beta"),
        allowNull: false,
      },
      time: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the enum type first to avoid dependency issues
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_RequestLogs_api";'
    );
    await queryInterface.dropTable("request_log");
  },
};
