
'use client'

import styles from "./LogOutBtn.module.css";
import { signOut, useSession } from "next-auth/react";

function LogOutBtn() {
  const session = useSession();

  function handleLogout() {
    signOut("google");
  }
  return (
    <>
      {session.status === "authenticated" && (
        <div className={styles.container}>
          <button className={styles.button} onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </>
  );
}

export default LogOutBtn;
