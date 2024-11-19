import { Sequelize } from "sequelize";
import config from "./index.js";

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: config.database.host,
  username: config.database.username,
  password: config.database.password,
  database: config.database.name,
  logging: config.environment === "development" ? console.log : false,
});
