import { pool } from "../../../lib/db";
import nextConnect from "next-connect";
import multer from "multer";

const listUsers = async () => {
  const result = await pool.query("SELECT * FROM usuario");
  return result.rows;
};

const createUser = async (body, files) => {
  const {
    nome_completo,
    email,
    data_nascimento,
    nome_usuario,
    senha,
    cpf,
    // fk_localizacao_id,
  } = body;

  const foto_perfil = files[0].buffer;

  await pool.query(
    "INSERT INTO usuario (nome_completo, email, data_nascimento, nome_usuario, senha, cpf, foto_perfil) VALUES ($1, $2, $3, $4, $5, $6, $7::bytea);",
    [
      nome_completo,
      email,
      data_nascimento,
      nome_usuario,
      senha,
      cpf,
      foto_perfil,
    ]
  );
};

const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method "${req.method}" Not Allowed` });
  },
});

apiRoute.use(multer().any());

apiRoute.post(async (req, res) => {
  await createUser(req.body, req.files);
  res.json("User created!");
  res.status(200).json({ data: "success" });
});

apiRoute.get(async (req, res) => {
  const users = await listUsers();
  res.json(users);
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
