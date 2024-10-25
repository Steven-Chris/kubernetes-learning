"use strict";

import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";
import process from "process";
import configJson from "../config/config.json" assert { type: "json" };

const basename = path.basename(new URL(import.meta.url).pathname);
const env = process.env.NODE_ENV || "development";
const config = configJson[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// Load all models in this directory
const dirname = path.dirname(new URL(import.meta.url).pathname);

fs.readdirSync(dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
  )
  .forEach(async (file) => {
    const modelModule = await import(path.join(dirname, file));
    const model = modelModule.default(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
