import supabase from "../supabaseClient.js";
export const addClient = async (req, res) => {
  console.log("🟢 Tentando cadastrar cliente:", req.body);

  const {
    organizacao_id,
    tipo_pessoa_id,
    nome_completo_ou_razao_social,
    cpf_ou_cnpj,
    email,
    telefone,
    cep,
    rua,
    numero,
    bairro,
    cidade,
    estado
  } = req.body;

  // ✅ Validação de obrigatórios
  if (
    !organizacao_id ||
    !tipo_pessoa_id ||
    !nome_completo_ou_razao_social ||
    !cpf_ou_cnpj ||
    !email ||
    !telefone ||
    !cep ||
    !rua ||
    !numero ||
    !bairro ||
    !cidade ||
    !estado
  ) {
    console.error("❌ Campos obrigatórios faltando:", req.body);
    return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
  }

  const { data, error } = await supabase
    .from("clientes")
    .insert([{
      organizacao_id,
      tipo_pessoa_id,
      nome_completo_ou_razao_social,
      cpf_ou_cnpj,
      email,
      telefone,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      estado
    }])
    .select();

  if (error) {
    console.error("❌ Erro ao cadastrar cliente:", error.message);
    return res.status(400).json({ error: error.message });
  }

  console.log("✅ Cliente cadastrado:", data[0]);
  res.json(data[0]);
};
