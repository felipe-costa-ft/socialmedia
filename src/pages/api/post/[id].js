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

apiRoute.delete(async (req, res) => {
  const { id } = req.query;
  const result = await pool.query(`DELETE FROM postagem WHERE id='${id}';`);

  res.json("sucess!");
});

apiRoute.patch(async (req, res) => {
  const { id } = req.query;
  const { body: data, files } = req;

  let columnsToUpdate = [];
  let values = [];

  Object.entries(data).forEach(([key, value]) => {
    if (value) {
      columnsToUpdate.push(key);
      values.push(value);
    }
  });

  if (files.length > 0) {
    columnsToUpdate.push("conteudo");
    values.push(files[0].buffer);
  }

  if (columnsToUpdate.length === 0) {
    return res.status(400).json({ error: "No data to update" });
  }

  const updateColumns = columnsToUpdate
    .map((column, index) => `${column} = $${index + 1}`)
    .join(", ");

  const result = await pool.query(
    `UPDATE postagem
        SET ${updateColumns}
        WHERE id=$${columnsToUpdate.length + 1};`,
    [...values, id]
  );

  res.json("Edited!");
});

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

export default apiRoute;
