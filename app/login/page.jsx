"use client";
import LogOutBtn from "@/components/LogOutBtn/LogOutBtn";
import styles from "./page.module.css";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoginBtn from "@/components/LoginBtn/LoginBtn";
import { useContext } from "react";

function Login() {
  const session = useSession();
  const router = useRouter();
  const { userId, setUserId } = useContext();

  async function createUser() {
    if (session.status === "authenticated") {
      try {
        const data = {
          name: session.data.user.name,
          email: session.data.user.email,
          imgURL: session.data.user.image,
          households: [],
        };
        const res = await fetch("http://localhost:3000/api/users", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const response = await res.json();
        console.log(response);
        if (res.ok) {
          router.push(response.redirect);
        } else {
          throw new Error("Failed to create a user");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  createUser();

  return (
    <div className={styles.container}>
      <LoginBtn />
    </div>
  );
}

export default Login;
