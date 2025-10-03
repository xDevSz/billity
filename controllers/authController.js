import supabase from "../supabaseClient.js";

export const signup = async (req, res) => {
  console.log("🟢 Signup request:", req.body);
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error) {
    console.error("❌ Erro no signup:", error.message);
    return res.status(400).json({ error: error.message });
  }

  console.log("✅ Usuário criado:", data.user);
  res.json({ user: data.user });
};

export const login = async (req, res) => {
  console.log("🟢 Login request:", req.body);
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("❌ Erro no login:", error.message);
    return res.status(400).json({ error: error.message });
  }

  console.log("✅ Login bem sucedido:", data.session?.user);
  res.json(data);
};
