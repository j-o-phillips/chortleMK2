"use client";
import { useState } from "react";
import styles from "./page.module.css";

function CreateHousehold() {
  const [householdName, setHouseholdName] = useState("");

  async function handleCreateHousehold(e) {
    e.preventDefault();
    if (!householdName) {
      alert("Household name required");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/household", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name: householdName }),
      });

      if (res.ok) {
        router.push("/createChore");
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
      ;
    </div>
  );
}

export default CreateHousehold;
