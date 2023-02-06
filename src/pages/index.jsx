import { Inter } from "@next/font/google";
import { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import ProfilePicture from "@/components/ProfilePicture";
import Link from "next/link";
import Button from "@/components/Button";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    const res = await fetch("http://localhost:3000/api/user");
    const data = await res.json();
    setUsers(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (cpf) => {
    await fetch(`http://localhost:3000/api/user/${cpf}`, {
      method: "DELETE",
    });
    fetchData();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Usuários</h1>
      <ul className={styles.list}>
        {users.map((user) => (
          <li key={user.cpf} className={styles.item}>
            <Link href={`/user/${user.cpf}`}>
              <div>
                <ProfilePicture user={user} size={200} />
              </div>
              <div>
                <p>Name: {user.nome_completo}</p>
                <p>Email: {user.email}</p>
              </div>
            </Link>
            <Button
              text="Deletar"
              color="#ff5151"
              onClick={() => handleDelete(user.cpf)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
