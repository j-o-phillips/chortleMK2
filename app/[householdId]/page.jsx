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
  const { user, setUser } = useContext(UserContext);
  const [chores, setChores] = useState([]);
  const [householdName, setHouseholdName] = useState("");
  const [completedChores, setCompletedChores] = useState([]);

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

  const getHouseholdData = async () => {
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
  };

  const handleDeleteChore = (choreId) => {
    setChores(chores.filter((chore) => chore._id !== choreId));
  };
  const handleMarkAsDone = (choreId) => {
    const updatedChores = chores.filter((chore) => chore._id !== choreId);
    const completedChore = chores.find((chore) => chore._id === choreId);
    setChores(updatedChores);
    setCompletedChores([...completedChores, completedChore]);
  };

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
            <div className={style.householdName}>{householdName}</div>
            {/* <div className={style.household}>Household</div> */}
          </div>
          <h1 className={style.h1}>Household Chores</h1>
          <div className={style.choreCont}>
            {sortedChores.map((chore) => {
              if (!chore.completed) {
                return (
                  <ChoreCard
                    key={chore._id}
                    data={chore}
                    householdId={user.households[0]}
                    onDeleteChore={handleDeleteChore}
                    onMarkAsDone={handleMarkAsDone}
                  />
                );
              }
              return null;
            })}
          </div>
        </div>
      </>
    );
  }
}

export default Dashboard;
