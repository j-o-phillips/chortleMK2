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

  async function handleSubmitEdit(e) {
    e.preventDefault();
    console.log(newChoreName, newChoreDesc, newChoreDeadline);
    const data = {
      name: newChoreName,
      description: newChoreDeadline,
      deadline: newChoreDeadline,
      assignees: chore.assignees,
      household: chore.household,
    };
    console.log(data);
    try {
      const res = await fetch(
        `http://localhost:3000/api/household/${user.households[0]}/chores/${choreId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (res.status === 200) {
        router.push(`/${user.households[0]}`);
      }
    } catch (error) {
      console.log(error);
    }
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
          <div className={styles.display}>
          <h1 className={styles.title}>{chore.name}</h1>
          <h2 className={styles.deadline}>
            Complete by: {formatDate(chore.deadline)}
          </h2>
          <p className={styles.description}>{chore.description}</p>

          <p className={styles.created}>
            Created on: {formatDate(chore.createdAt)}
          </p>
          </div>
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
                    placeholder={newChoreName}
                    value={newChoreName}
                    onChange={(e) => {
                      setNewChoreName(e.target.value);
                    }}
                  />
                  <br />
                  <textarea
                    className={styles.textarea}
                    type="text"
                    placeholder={newChoreDesc}
                    rows={2}
                    value={newChoreDesc}
                    onChange={(e) => {
                      setNewChoreDesc(e.target.value);
                    }}
                  />{" "}
                  <br />
                  <DatePicker
                    className={styles.input}
                    placeholderText="Due Date"
                    dateFormat="dd-MM-yyyy"
                    selected={newChoreDeadline}
                    onChange={(date) => {
                      setNewChoreDeadline(date);
                    }}
                  />{" "}
                  <br />
                </form>
              </div>
              <button className="button" onClick={handleSubmitEdit}>
                Submit Changes
              </button>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default Chore;
