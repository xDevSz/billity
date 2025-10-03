import express from "express";
import supabase from "../supabaseClient.js";

const router = express.Router();

// Criar usuário
router.post("/", async (req, res) => {
  const { name } = req.body;

  try {
    const { data, error } = await supabase
      .from("users")
      .insert([{ name }])
      .select();

    if (error) {
      console.error("❌ Erro ao inserir usuário:", error);
      return res.status(500).json({ ok: false, error });
    }

    res.json({ ok: true, data });
  } catch (err) {
    console.error("❌ Erro inesperado:", err.message);
    res.status(500).json({ ok: false, err: err.message });
  }
});

// Listar usuários
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    return res.status(500).json({ ok: false, error });
  }

  res.json({ ok: true, data });
});

export default router;
