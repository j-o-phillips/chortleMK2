"use client";
import { signIn } from "next-auth/react";
import styles from "./LoginBtn.module.css";

function LoginBtn() {
  function handleLogin() {
    signIn("google");
  }
  return (
    <div>
      <button className={styles.button} onClick={handleLogin}>
        Login with Google
      </button>
    </div>
  );
}

export default LoginBtn;
