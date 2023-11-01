"use client";

import { useRouter } from "next/navigation";
import styles from "./LogOutBtn.module.css";
import { signOut, useSession } from "next-auth/react";

function LogOutBtn() {
  const session = useSession();
  const router = useRouter();

  function handleLogout() {
    signOut("google");
    router.push("/");
  }
  return (
    <>
      <div className={styles.container}>
        <button className={styles.button} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
}

export default LogOutBtn;
