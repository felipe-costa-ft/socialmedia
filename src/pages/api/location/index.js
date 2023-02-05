import { pool } from "@/lib/db";

const listLocations = async () => {
  const result = await pool.query("SELECT * FROM localizacao");
  return result.rows;
};

const createLocation = async (body) => {
  const { country, state, city } = JSON.parse(body);
  await pool.query(`INSERT INTO localizacao (pais, cidade, estado)
  VALUES ('${country}', '${city}', '${state}');`);
};

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      // handle GET request
      const users = await listLocations();
      res.json(users);
      break;
    case "POST":
      const { body } = req;
      try {
        await createLocation(body);
        res.json("Location created!");
      } catch (error) {
        console.error("Unable to create a new location: ", error);
        res.json("Unable to create a new location");
      }
      break;
    default:
      res.status(405).send("Method Not Allowed");
      break;
  }
}
