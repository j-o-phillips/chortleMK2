"use client";
import { useContext, useEffect, useState } from "react";
import styles from "./page.module.css";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

function members() {
  const session = useSession();
  const [memberEmail, setMemberEmail] = useState("");
  const [membersList, setMembersList] = useState([]);
  const [householdNameInput, setHouseholdNameInput] = useState("");
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  //* Get existing members
  async function getMembers() {
    const res = await fetch(
      `http://localhost:3000/api/household/${user.households[0]}/members`
    );
    const data = await res.json();
    setMembersList(data.members);
  }

  useEffect(() => {
    getMembers();
  }, []);

  //* Adding New Members
  async function AddMember(e) {
    e.preventDefault();
    const userConfirmed = window.confirm(
      "Are you sure you want to add this member to your household?"
    );

    if (userConfirmed) {
      if (!memberEmail) {
        alert("Email required");
        return;
      }
      try {
        const res = await fetch(
          `http://localhost:3000/api/household/${user.households[0]}/members`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ email: memberEmail }),
          }
        );
        router.push(`/${user.households[0]}`)

        if (res.ok) {
          const response = await res.json();
          // await setHousehold(response.household);
          // router.push(`/${response.household._id}`);
        } else {
          throw new Error("Failed to add a new member");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  //* Remove user from household
  async function removeMember(memberId) {
    const userConfirmed = window.confirm(
      "Are you sure you want to remove this member from your household?"
    );

    if (userConfirmed) {
      try {
        await fetch(
          `http://localhost:3000/api/household/${user.households[0]}/members`,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ memberId }),
          }
        );
        router.push(`/${user.households[0]}`);
      } catch (error) {
        console.error(error);
      }
    }
  }

  async function handleRenameHousehold(e) {
    e.preventDefault();
    const userConfirmed = window.confirm(
      "Are you sure you want to rename your household?"
    );

    if (userConfirmed) {
      try {
        await fetch(
          `http://localhost:3000/api/household/${user.households[0]}`,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ householdNameInput }),
          }
        );
        router.push(`/${user.households[0]}`);
      } catch (error) {
        console.error(error);
      }
    }
  }

  //* Checks if a user is logged in
  if (session.status === "loading") {
    return <p>loading...</p>;
  }
  if (session.status === "unauthenticated") {
    router.push("/login");
  }
  if (session.status === "authenticated") {
    return (
      <>
        <div className={styles.container}>
          <h1 className={styles.title}>Edit My Household</h1>
          <form onSubmit={handleRenameHousehold} className={styles.edit}>
            <input
              className={styles.input}
              type="text"
              placeholder="name"
              onChange={(e) => {
                setHouseholdNameInput(e.target.value);
              }}
            />
            <button className="button">Rename Household</button>
          </form>
          <form onSubmit={AddMember} className={styles.edit}>
            <input
              className={styles.input}
              type="email"
              placeholder="email"
              onChange={(e) => {
                setMemberEmail(e.target.value);
              }}
            />
            <button className="button">Add New Member</button>
          </form>
          <div className={styles.flex}>
            <h2 className={styles.subtitle}>Current Members</h2>
            <ul>
              {membersList.map((member) => {
                return (
                  <li key={member._id}>
                    {member.email}
                    <button
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ml-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      onClick={() => {
                        removeMember(member._id);
                      }}
                    >
                      Delete
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default members;
