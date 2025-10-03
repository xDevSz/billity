import { Router } from "express";
import { addClient } from "../controllers/clientController.js";

const router = Router();

router.post("/", addClient); // Apenas rota de criação de cliente

export default router;
