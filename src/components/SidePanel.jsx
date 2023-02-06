import Image from "next/image";
import React from "react";
import styles from "@/styles/SidePanel.module.css";
import ProfilePicture from "./ProfilePicture";
import Button from "./Button";
import Link from "next/link";

const SidePanel = ({ user }) => (
  <aside className={styles.sidePanel}>
    <ProfilePicture user={user} size={200} />
    <h2 className={styles.name}>{user.nome_completo}</h2>
    <p className={styles.email}>{user.email}</p>
    <Link href={`/user/edit/${user.cpf}`} shallow>
      <Button text="Editar Perfil" color="#ffc107" />
    </Link>
  </aside>
);

export default SidePanel;
