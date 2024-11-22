import express from "express";
import routes from "./routes/index.js";
import config from "./configs/index.js";
import { sequelize } from "./configs/database.js";

const app = express();

app.use(express.json());
app.use("/api", routes);

async function initializeApp() {
  try {
    await sequelize.authenticate();
    console.log("Database connection established");
    // await sequelize.sync();
    // console.log('Database synchronized');

    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error("Unable to start application:", error);
    process.exit(1);
  }
}

initializeApp();
