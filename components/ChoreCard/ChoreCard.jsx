"use client";
import { useState, useEffect, useContext } from "react";
// import Image from "next/image";
import style from "./ChoreCard.module.css";
import Link from "next/link";
import { UserContext } from "@/context/UserContext";

function ChoreCard({ data, onDeleteChore, householdId, onMarkAsDone }) {
  const { user } = useContext(UserContext);
  const [isCompleted, setIsCompleted] = useState(false);
  const [assigneeData, setAssigneeData] = useState([]);

  const handleMarkAsDone = async (e) => {
    e.preventDefault();
    const userConfirmed = window.confirm(
      "Are you sure you want to mark this chore as completed?"
    );

    if (userConfirmed) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/household/${householdId}/chores/${data._id}`,
          {
            method: "PATCH",
            body: JSON.stringify({ completed: true }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          onMarkAsDone(data._id);
        } else {
          console.error("Chore completion failed", error);
        }
      } catch (error) {
        console.error("Error marking chore as completed", error);
      }
    } else {
      console.log("Chore completion canceled");
    }
  };

  useEffect(() => {
    const assigneeIds = data.assignees;

    if (data.completed) {
      setIsCompleted(true);
    }

    Promise.all(
      assigneeIds.map(async (assigneeId) => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${assigneeId}`
        );
        if (response.ok) {
          const userData = await response.json();
          return userData;
        }
        return null;
      })
    )
      .then((userDataArray) => {
        const validUserData = userDataArray.filter(
          (userData) => userData !== null
        );
        setAssigneeData(validUserData);
      })
      .catch((error) => {
        console.error("Error fetching assignee data", error);
      });
  }, []);

  function formatDueDate(dateString) {
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

  const cardColor = progressBarVariant(data.deadline);

  const handleDeleteChore = async (e) => {
    e.preventDefault();
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this chore?"
    )
    if (userConfirmed) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/household/${householdId}/chores/${data._id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        onDeleteChore(data._id);
      } else {
        console.error("Chore deletion failed", error);
      }
    } catch (error) {
      console.error("Error deleting chore", error);
    }
  }
  };


  return (
    <>
      <Link href={`/${user.households[0]}/${data._id}`}>
        <div className={`${style.card} ${cardColor}`}>
          <h3 className={style.h3}>Chore: {data.name}</h3>
          <div className={style.chore}>
            <h5 className={style.h5}>Description:</h5>
            <p>{data.description}</p>
          </div>
          <div className={style.date}>
            <h5 className={style.h5}>Due date:</h5>
            <p className={style.due}>{formatDueDate(data.deadline)}</p>
          </div>
          <div className={style.users}>
            <h5 className={style.h5}>Assign to:</h5>
            <div className={style.pictures}>
              {assigneeData.map((foundUser, index) => (
                <div key={index}>
                  <img
                    src={foundUser.user.imgURL}
                    alt={foundUser.user.name}
                    className={style.photo}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className={style.isdone}>
            <div className={style.buttonGroup}>
              <button
                className={isCompleted ? style.completed : style.markDone}
                onClick={handleMarkAsDone}
                disabled={isCompleted}
              >
                {isCompleted ? "Completed" : "Close Chore"}
              </button>
              <div className={style.delete}>
                <button onClick={handleDeleteChore}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default ChoreCard;
