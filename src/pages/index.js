import { Inter } from "@next/font/google";
import { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/api/user");
      const data = await res.json();
      setUsers(data);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Usuários</h1>
      <ul className={styles.list}>
        {users.map((user) => (
          <li key={user.cpf} className={styles.item}>
            <p>Name: {user.nome_completo}</p>
            <p>Email: {user.email}</p>
            <p>CPF: {user.cpf}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
