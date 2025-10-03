import { Router } from "express";

const router = Router();

// Log middleware só para esse grupo de rotas
router.use((req, res, next) => {
  console.log(`🔑 [AUTH] ${req.method} ${req.originalUrl}`);
  if (Object.keys(req.body).length > 0) {
    console.log("📥 Body:", req.body);
  }
  next();
});

// Rota de login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log("➡️ Tentativa de login:", { email });
  res.json({ message: "Login endpoint funcionando!", email });
});

// Rota de registro
router.post("/register", (req, res) => {
  const { name, email } = req.body;
  console.log("➡️ Novo registro:", { name, email });
  res.json({ message: "Registro endpoint funcionando!", name, email });
});

export default router;

