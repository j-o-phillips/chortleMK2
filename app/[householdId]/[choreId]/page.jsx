"use client";
import style from "./page.module.css";
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
    const data = {
      name: newChoreName,
      description: newChoreDeadline,
      deadline: newChoreDeadline,
      assignees: chore.assignees,
      household: chore.household,
    };
    const userConfirmed = window.confirm(
      "Are you sure you want to save this changes?"
    );

    if (userConfirmed) {
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

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-based, so add 1
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  function progressBarVariant(deadline) {
    if (!deadline) {
      return style.primary;
    }

    const today = new Date();
    const timeToDeadline = new Date(deadline) - today;
    const daysToDeadline = timeToDeadline / (1000 * 60 * 60 * 24);

    if (daysToDeadline <= 0) {
      return style.danger;
    } else if (daysToDeadline <= 3) {
      return style.warning;
    }
    return style.primary;
  }

  const cardColor = progressBarVariant(chore.deadline)

  function getPriorityText(deadline) {
    if (!deadline) {
      return 'Unknown';
    }

    const today = new Date();
    const timeToDeadline = new Date(deadline) - today;
    const daysToDeadline = timeToDeadline / (1000 * 60 * 60 * 24);

    if (daysToDeadline <= 0) {
      return 'High';
    } else if (daysToDeadline <= 3) {
      return 'Medium';
    }

    return 'Low';
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
        <div className={style.container}>
          <div className={`${style.display} ${cardColor}`}>
          <h1 className={style.title}>{chore.name}</h1>
          <h2 className={style.deadline}>
            Complete by: {formatDate(chore.deadline)}
          </h2>
          <p className={style.description}>{chore.description}</p>
          <p className={style.created}>
            Created on: {formatDate(chore.createdAt)}
          </p>
          <p className={style.priorityText}>Priority: {getPriorityText(chore.deadline)}</p>
          </div>
          <button className="button" onClick={toggleEdit}>
            Edit This Chore
          </button>
          {editVisible && (
            <div className={style.formContainer}>
              <div className={style.form}>
                <form>
                  <input
                    className={style.input}
                    type="text"
                    placeholder={chore.name}
                    value={newChoreName}
                    onChange={(e) => {
                      setNewChoreName(e.target.value);
                    }}
                  />
                  <br />
                  <textarea
                    className={style.textarea}
                    type="text"
                    placeholder={chore.description}
                    rows={2}
                    value={newChoreDesc}
                    onChange={(e) => {
                      setNewChoreDesc(e.target.value);
                    }}
                  />{" "}
                  <br />
                  <DatePicker
                    className={style.input}
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
