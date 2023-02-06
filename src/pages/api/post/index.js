import { pool } from "../../../lib/db";
import nextConnect from "next-connect";
import multer from "multer";

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

apiRoute.get(async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM usuario, postagem where usuario.cpf=postagem.fk_usuario_cpf ORDER BY data DESC"
  );
  res.json(result.rows);
});

apiRoute.post(async (req, res) => {
  const { body, files } = req;

  const { legenda, user, nome_usuario } = body;

  const conteudo = files.length > 0 ? files[0].buffer : undefined;

  if (files.length > 0)
    await pool.query(
      "INSERT INTO postagem (legenda, conteudo, fk_usuario_cpf, fk_usuario_nome_usuario) VALUES ($1, $2::bytea, $3, $4);",
      [legenda, conteudo, user, nome_usuario]
    );
  else
    await pool.query(
      "INSERT INTO postagem (legenda, fk_usuario_cpf, fk_usuario_nome_usuario) VALUES ($1, $2, $3);",
      [legenda, user, nome_usuario]
    );
  res.status(200).json({ data: "success" });
});

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

export default apiRoute;
