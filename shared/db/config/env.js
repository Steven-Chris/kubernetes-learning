const dotenv = require("dotenv");
const result = dotenv.config();
if (result.error) {
  console.error("Error loading .env file:", result.error);
  process.exit(1);
}
