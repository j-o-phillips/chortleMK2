"use client";

import ChoreCard from "@/components/ChoreCard/ChoreCard";
import style from "./page.module.css";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

function Dashboard() {
  const session = useSession();
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [chores, setChores] = useState([]);

  async function getChores() {
    try {
      const response = await fetch(
        `http://localhost:3000/api/household/${user.households[0]}/chores`
      );
      const data = await response.json();
      setChores(data.chores);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getChores();
  }, []);

  if (session.status === "unauthenticated") {
    router.push("/");
  }
  if (session.status === "loading") {
    return <p>loading...</p>;
  }
  if (session.status === "authenticated") {
    return (
      <>
        <div className={style.page}>
          <h1 className={style.h1}>Chores</h1>
          <button
            onClick={() => {
              console.log(chores);
            }}
          >
            print chores
          </button>
          {chores.map((chore) => {
            return (
              <ChoreCard
                key={chore._id}
                data={chore}
              />)
          })}
        </div>
      </>
    );
  }
}

export default Dashboard;
