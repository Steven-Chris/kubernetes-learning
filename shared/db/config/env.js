const dotenv = require("dotenv");
const path = require("path");

const result = dotenv.config({
  path: path.resolve("../../shared/.env"),
});
if (result.error) {
  console.error("Error loading .env file:", result.error);
  process.exit(1);
}
