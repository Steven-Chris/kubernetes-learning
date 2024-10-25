require("./config/env");
const { Sequelize } = require("sequelize");
const dbConfig = require("../../shared/db/config/config");

const env = process.env.NODE_ENV || "development";
const config = dbConfig[env];

console.log(config);

const sequelize = new Sequelize(
  process.env.DB_NAME || config.database,
  process.env.DB_USER || config.username,
  process.env.DB_PASS || config.password,
  {
    host: process.env.DB_HOST || config.host,
    dialect: config.dialect,
    port: process.env.DB_PORT || config.port,
    logging: false,
  }
);

// Test the database connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1); // Exit the process with failure
  }
}

testConnection();

module.exports = sequelize;
