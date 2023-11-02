"use client";
import styles from "./page.module.css";
import { UserContext } from "@/context/UserContext";
import React, { useState, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import { formatDate } from "@/app/utils/functions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";

function Chore({ params }) {
  const { user } = useContext(UserContext);
  const session = useSession();
  const router = useRouter();
  const [chore, setChore] = useState("");
  const [newChoreName, setNewChoreName] = useState("");
  const [newChoreDesc, setNewChoreDesc] = useState("");
  const [newChoreDeadline, setNewChoreDeadline] = useState("");
  const [editVisible, setEditVisible] = useState(false);
  const { choreId } = params;
  let loading = false;

  function toggleEdit() {
    return setEditVisible(!editVisible);
  }

  async function getChore() {
    loading = true;
    try {
      const response = await fetch(
        `http://localhost:3000/api/household/${user.households[0]}/chores/${choreId}`
      );
      const data = await response.json();
      console.log(data.chore);
      setChore(data.chore);
      loading = false;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getChore();
  }, []);

  if (session.status === "unauthenticated") {
    router.push("/");
  }
  if (session.status === "loading" || loading === true) {
    return <p>loading...</p>;
  }
  if (session.status === "authenticated") {
    return (
      <>
        <div className={styles.container}>
          <h1 className={styles.title}>{chore.name}</h1>
          <h2 className={styles.deadline}>
            Complete by: {formatDate(chore.deadline)}
          </h2>
          <p className={styles.description}>{chore.description}</p>

          <p className={styles.created}>
            Created on: {formatDate(chore.createdAt)}
          </p>
          <button className="button" onClick={toggleEdit}>
            Toggle Edit Chore
          </button>
          {editVisible && (
            <div className={styles.formContainer}>
              <div className={styles.form}>
                <form>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="Name"
                    value={newChoreName}
                  />
                  <br />
                  <textarea
                    className={styles.textarea}
                    type="text"
                    placeholder={newChoreDesc}
                    rows={2}
                    value={newChoreDesc}
                  />{" "}
                  <br />
                  <DatePicker
                    className={styles.input}
                    placeholderText="Due Date"
                    dateFormat="dd-MM-yyyy"
                    value={newChoreDeadline}
                  />{" "}
                  <br />
                </form>
              </div>
              <button className="button">Submit Changes</button>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default Chore;
