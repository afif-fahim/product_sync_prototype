import express from "express";
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

async function initializeApp() {
  try {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start application:", error);
    process.exit(1);
  }
}

initializeApp();
