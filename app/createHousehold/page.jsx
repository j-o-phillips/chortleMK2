"use client";
import { useContext, useState } from "react";
import styles from "./page.module.css";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";

function CreateHousehold() {
  const [householdName, setHouseholdName] = useState("");
  const { user } = useContext(UserContext);
  const router = useRouter();

  async function handleCreateHousehold(e) {
    e.preventDefault();
    if (!householdName) {
      alert("Household name required");
      return;
    }

    try {
      const data = {
        name: householdName,
        user: user._id,
      };

      const res = await fetch("http://localhost:3000/api/household", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        //get househild id from response
        const response = await res.json();
        // await setHousehold(response.household);
        router.push(`/${response.household._id}`);
      } else {
        throw new Error("Failed to create new household");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleCreateHousehold}>
        <input
          className={styles.input}
          type="text"
          placeholder="name"
          onChange={(e) => {
            setHouseholdName(e.target.value);
          }}
        />

        <button className={styles.button}>Create Household</button>
      </form>
    </div>
  );
}

export default CreateHousehold;
