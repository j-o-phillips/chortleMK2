"use client";
import ChoreCard from "@/components/ChoreCard/ChoreCard";
import style from "./page.module.css";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

function AllChores() {
  const session = useSession();
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [chores, setChores] = useState([]);
  const [householdName, setHouseholdName] = useState("");

  async function getChores() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/household/${user.households[0]}/chores`
      );
      const data = await response.json();
      setChores(data.chores);
    } catch (error) {
      console.log(error);
    }
  }

  async function getHouseholdData() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/household/${user.households[0]}`
      );
      if (response.ok) {
        const data = await response.json();
        const householdName = data.allUsers.name;
        setHouseholdName(householdName);
      } else {
        console.error("Error fetching household data");
      }
    } catch (error) {
      console.error("Error fetching household data", error);
    }
  }

  function handleDeleteChore(choreId) {
    setChores(chores.filter((chore) => chore._id !== choreId));
  }

  useEffect(() => {
    getChores();
    getHouseholdData();
  }, []);

  if (session.status === "unauthenticated") {
    router.push("/");
  }
  if (session.status === "loading") {
    return <p>loading...</p>;
  }
  if (session.status === "authenticated") {
    let sortedChores = [];
    if (chores.length > 0) {
      sortedChores = [...chores].sort((a, b) => {
        return new Date(a.deadline) - new Date(b.deadline);
      });
    }

    return (
      <>
        <div className={style.page}>
          <div className={style.householdTitle}>
            <div className={style.householdName}>"{householdName}"</div>
          </div>
          <h1 className={style.h1}>All Household Chores</h1>

          {sortedChores.map((chore) => {
            return (
              <ChoreCard
                key={chore._id}
                data={chore}
                householdId={user.households[0]}
                onDeleteChore={handleDeleteChore}
              />
            );
          })}
        </div>
      </>
    );
  }
}

export default AllChores;
