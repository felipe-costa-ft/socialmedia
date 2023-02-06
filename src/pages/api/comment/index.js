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
    "SELECT * FROM comentario ORDER BY data DESC"
  );
  res.json(result.rows);
});

apiRoute.post(async (req, res) => {
  const { body } = req;

  const { texto, postagem_id, fk_usuario_cpf, fk_usuario_nome_usuario } = body;

  await pool.query(
    "INSERT INTO comentario (texto, fk_postagem_id, fk_usuario_cpf, fk_usuario_nome_usuario) VALUES ($1, $2, $3, $4);",
    [texto, postagem_id, fk_usuario_cpf, fk_usuario_nome_usuario]
  );

  res.status(200).json({ data: "success" });
});

apiRoute.patch(async (req, res) => {
  const { id } = req.query;
  const { body: data } = req;

  const columnsToUpdate = Object.entries(data)
    .filter(([, value]) => value)
    .map(([key, value]) => `${key} = '${value}'`)
    .join(", ");

  const result = await pool.query(
    `UPDATE comentario
      SET ${columnsToUpdate}
      WHERE id='${id}';`
  );

  res.json("Edited!");
});

apiRoute.delete(async (req, res) => {
  const { id } = req.query;

  await pool.query(`DELETE FROM comentario WHERE id=${id}`);

  res.json("Deleted");
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apiRoute;
