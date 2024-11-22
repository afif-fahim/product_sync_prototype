import { Router } from "express";
import ClientController from "../controllers/ClientController.js";
import ProductController from "../controllers/ProductController.js";

const router = Router();

router.post("/clients", ClientController.create);
router.get("/clients", ClientController.list);

router.post('/sync/:clientId', ProductController.sync);
router.get('/products/:clientId', ProductController.list);

export default router;
