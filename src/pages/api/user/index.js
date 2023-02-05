import { pool } from "../../../lib/db";

const listUsers = async () => {
  const result = await pool.query("SELECT * FROM usuario");
  return result.rows;
};

const createUser = async (body) => {
  console.log(body);
  const {
    nome_completo,
    email,
    data_nascimento,
    nome_usuario,
    senha,
    cpf,
    foto_perfil,
    fk_localizacao_id,
  } = body;

  await pool.query(`INSERT INTO usuario (nome_completo, email, data_nascimento, nome_usuario, senha, cpf, foto_perfil, fk_localizacao_id)
  VALUES ('${nome_completo}', '${email}', '${data_nascimento}', '${nome_usuario}', '${senha}', '${cpf}', '${foto_perfil}', '${fk_localizacao_id}');`);
};

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      const users = await listUsers();
      res.json(users);
      break;
    case "POST":
      const { body } = req;
      try {
        await createUser(body);
        res.json("User created!");
      } catch (error) {
        console.error("Unable to create a new User: ", error);
        res.json("Unable to create a new User");
      }
      break;
    default:
      res.status(405).send("Method Not Allowed");
      break;
  }
}
