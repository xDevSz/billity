import supabase from "../supabaseClient.js";

export const getUsers = async (req, res) => {
  console.log("🟢 Buscando usuários...");
  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    console.error("❌ Erro ao buscar usuários:", error.message);
    return res.status(400).json({ error: error.message });
  }

  console.log(`✅ ${data.length} usuários encontrados`);
  res.json(data);
};
