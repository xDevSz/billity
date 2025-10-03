import supabase from "../supabaseClient.js";

export const getBills = async (req, res) => {
  console.log("🟢 Buscando contas...");
  const { data, error } = await supabase.from("bills").select("*");

  if (error) {
    console.error("❌ Erro ao buscar contas:", error.message);
    return res.status(400).json({ error: error.message });
  }

  console.log(`✅ ${data.length} contas encontradas`);
  res.json(data);
};

export const addBill = async (req, res) => {
  console.log("🟢 Adicionando conta:", req.body);
  const { title, amount, due_date, user_id } = req.body;

  const { data, error } = await supabase.from("bills").insert([
    { title, amount, due_date, user_id }
  ]);

  if (error) {
    console.error("❌ Erro ao inserir conta:", error.message);
    return res.status(400).json({ error: error.message });
  }

  console.log("✅ Conta adicionada:", data);
  res.json(data);
};
