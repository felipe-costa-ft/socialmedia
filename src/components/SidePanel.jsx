import Image from "next/image";
import React from "react";
import styles from "@/styles/SidePanel.module.css";

const SidePanel = ({ user }) => (
  <aside className={styles.sidePanel}>
    {/* <Image className={styles.avatar} src={user.avatar} alt={user.name} /> */}
    <h2 className={styles.name}>{user.nome_completo}</h2>
    <p className={styles.email}>{user.email}</p>
  </aside>
);

export default SidePanel;
