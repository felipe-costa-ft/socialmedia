import { pool } from "@/lib/db";

const deleteLocation = async (id) => {
  await pool.query(`DELETE FROM localizacao WHERE id='${id}';`);
};

const getLocation = async (id) => {
  const result = await pool.query(
    `SELECT * FROM localizacao WHERE id='${id}';`
  );

  return result.rows[0];
};

const updateLocation = async (id, body) => {
  const { country, state, city } = JSON.parse(body);

  let columnsToUpdate = [];
  if (country) {
    columnsToUpdate.push(`pais = '${country}'`);
  }
  if (state) {
    columnsToUpdate.push(`estado = '${state}'`);
  }
  if (city) {
    columnsToUpdate.push(`cidade = '${city}'`);
  }

  const columns = columnsToUpdate.join(", ");

  const result = await pool.query(
    `UPDATE localizacao
    SET ${columns}
    WHERE id='${id}';`
  );

  return result.rows[0];
};

export default async function handler(req, res) {
  const { id } = req.query;

  switch (req.method) {
    case "GET":
      const users = await getLocation(id);
      res.json(users);
      break;
    case "DELETE":
      try {
        await deleteLocation(id);
        res.json("Location deleted!");
      } catch (error) {
        console.error("Unable to delete: ", error);
        res.json("Unable to delete location!");
      }
      break;
    case "PATCH":
      const { body } = req;
      try {
        await updateLocation(id, body);
        res.json("Location updated!");
      } catch (error) {
        console.error("Unable to update: ", error);
        res.json("Unable to update location!");
      }
      break;

    default:
      res.status(405).send("Method Not Allowed");
      break;
  }
}
