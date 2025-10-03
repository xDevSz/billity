import { Router } from "express";

const router = Router();

// Log middleware para bills
router.use((req, res, next) => {
  console.log(`💰 [BILLS] ${req.method} ${req.originalUrl}`);
  if (Object.keys(req.body).length > 0) {
    console.log("📥 Body:", req.body);
  }
  next();
});

// Listar todas as contas
router.get("/", (req, res) => {
  console.log("➡️ Listando contas...");
  res.json([{ id: 1, description: "Conta de Luz", amount: 120 }]);
});

// Criar uma nova conta
router.post("/", (req, res) => {
  const { description, amount } = req.body;
  console.log("➡️ Criando conta:", { description, amount });
  res.json({ message: "Conta criada com sucesso!", description, amount });
});

export default router;
