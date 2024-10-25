const { DataTypes } = require("sequelize");
const sequelize = require("../database.js");

const Request_log = sequelize.define(
  "Request_log",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    request: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    api: {
      type: DataTypes.ENUM("alpha", "beta"),
      allowNull: false,
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "request_log",
    timestamps: false,
  }
);

module.exports = Request_log;
