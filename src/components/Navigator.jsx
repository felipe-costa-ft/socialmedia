import Link from "next/link";
import styles from "../styles/Navigator.module.css";

const Navigator = () => {
  return (
    <nav className={styles.navContainer}>
      <Link className={styles.navItem} href="/">
        Home
      </Link>
      <Link className={styles.navItem} href="/register">
        Registrar Usuário
      </Link>
    </nav>
  );
};

export default Navigator;
