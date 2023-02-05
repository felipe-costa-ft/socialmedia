import { pool } from "@/lib/db";

const deleteUser = async (cpf) => {
  await pool.query(`DELETE FROM usuario WHERE cpf='${cpf}';`);
};

const getUser = async (cpf) => {
  const result = await pool.query(`SELECT * FROM usuario WHERE cpf='${cpf}';`);

  return result.rows[0];
};

const updateUser = async (user_cpf, body) => {
  const {
    nome_completo,
    email,
    data_nascimento,
    nome_usuario,
    senha,
    cpf,
    foto_perfil,
    fk_localizacao_id,
  } = JSON.parse(body);

  let columnsToUpdate = [];
  if (nome_completo) {
    columnsToUpdate.push(`nome_completo = '${nome_completo}'`);
  }
  if (email) {
    columnsToUpdate.push(`email = '${email}'`);
  }
  if (data_nascimento) {
    columnsToUpdate.push(`data_nascimento = '${data_nascimento}'`);
  }
  if (nome_usuario) {
    columnsToUpdate.push(`nome_usuario = '${nome_usuario}'`);
  }
  if (senha) {
    columnsToUpdate.push(`senha = '${senha}'`);
  }
  if (cpf) {
    columnsToUpdate.push(`cpf = '${cpf}'`);
  }
  if (fk_localizacao_id) {
    columnsToUpdate.push(`fk_localizacao_id = '${fk_localizacao_id}'`);
  }

  const columns = columnsToUpdate.join(", ");

  const result = await pool.query(
    `UPDATE usuario
    SET ${columns}
    WHERE cpf='${user_cpf}';`
  );

  return result.rows[0];
};

export default async function handler(req, res) {
  const { cpf } = req.query;

  switch (req.method) {
    case "GET":
      const users = await getUser(cpf);
      res.json(users);
      break;
    case "DELETE":
      try {
        await deleteUser(cpf);
        res.json("User deleted!");
      } catch (error) {
        console.error("Unable to delete: ", error);
        res.json("Unable to delete User!");
      }
      break;
    case "PATCH":
      const { body } = req;
      try {
        await updateUser(cpf, body);
        res.json("User updated!");
      } catch (error) {
        console.error("Unable to update: ", error);
        res.json("Unable to update User!");
      }
      break;

    default:
      res.status(405).send("Method Not Allowed");
      break;
  }
}
