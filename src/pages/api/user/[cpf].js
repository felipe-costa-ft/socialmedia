import { pool } from "@/lib/db";
import nextConnect from "next-connect";
import multer from "multer";

const deleteUser = async (cpf) => {
  await pool.query(`DELETE FROM usuario WHERE cpf='${cpf}';`);
};

const getUser = async (cpf) => {
  const result = await pool.query(`SELECT * FROM usuario WHERE cpf='${cpf}';`);

  return result.rows[0];
};

const updateUser = async (user_cpf, body, files) => {
  const data = body;

  let columnsToUpdate = Object.entries(data)
    .filter(([, value]) => value)
    .map(([key, value]) => `${key} = '${value}'`)
    .join(", ");

  let query;
  let values = [];
  if (files.length > 0) {
    columnsToUpdate += ", foto_perfil = $1";
    values.push(files[0].buffer);
    query = `UPDATE usuario SET ${columnsToUpdate} WHERE cpf=$2;`;
  } else {
    query = `UPDATE usuario SET ${columnsToUpdate} WHERE cpf=$1;`;
  }

  values.push(user_cpf);

  const result = await pool.query(query, values);

  return result.rows[0];
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

apiRoute.patch(async (req, res) => {
  const { cpf } = req.query;
  await updateUser(cpf, req.body, req.files);
  res.json("User updated!");
  res.status(200).json({ data: "success" });
});

apiRoute.get(async (req, res) => {
  const { cpf } = req.query;
  const users = await getUser(cpf);
  res.json(users);
});

apiRoute.delete(async (req, res) => {
  const { cpf } = req.query;
  await deleteUser(cpf);
  res.json("deleted!");
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
