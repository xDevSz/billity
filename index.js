import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// 🔹 Carrega variáveis de ambiente
dotenv.config();

// 🔹 Cria app Express
const app = express();

// 🔹 Middlewares globais
app.use(cors());
app.use(express.json());

// 🔹 Log de todas as requisições
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  if (Object.keys(req.body).length > 0) {
    console.log("📦 Body:", req.body);
  }
  next();
});

// 🔹 Importa rotas
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js"; // pode remover se não usar
import billsRoutes from "./routes/billsRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";

// 🔹 Usa as rotas
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/bills", billsRoutes);
app.use("/clients", clientRoutes); // ✅ Rotas de clientes

// 🔹 Rota raiz (saúde da API)
app.get("/", (req, res) => {
  res.send("🚀 API rodando com sucesso!");
});

// 🔹 Inicializa servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server rodando na porta ${PORT}`));
