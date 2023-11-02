"use client"
import ChoreCard from "@/components/ChoreCard/ChoreCard";
import style from './page.module.css'
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

function allChores() {
    const session = useSession();
    const router = useRouter();
    const { user } = useContext(UserContext);
    const [chores, setChores] = useState([]);
    const [householdName, setHouseholdName] = useState('')
  
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
  
    const getHouseholdData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/household/${user.households[0]}`);
        if (response.ok) {
          const data = await response.json();
          const householdName = data.allUsers.name;
          console.log(`Household Name: ${householdName}`);
          setHouseholdName(householdName)
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
  
    useEffect(() => {
      getChores();
      getHouseholdData()
    }, []);
    
  
    if (session.status === "unauthenticated") {
      router.push("/");
    }
    if (session.status === "loading") {
      return <p>loading...</p>;
    }
    if (session.status === "authenticated") {
  
      const sortedChores = [...chores].sort((a, b) => {
        return new Date(a.deadline) - new Date(b.deadline)
      })
  
      return (
        <>
        <div className={style.page}>
          <div className={style.householdTitle}>
            <div className={style.householdName}>"{householdName}"</div>
          </div>
          <h1 className={style.h1}>Household Chores</h1>

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
  

export default allChores