import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  environment: process.env.ENV,
  database: {
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
};

export default config;
