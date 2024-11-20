import { Router } from "express";
import ClientController from "../controllers/ClientController.js";

const router = Router();

router.post("/clients", ClientController.create);
router.get("/clients", ClientController.list);

export default router;
