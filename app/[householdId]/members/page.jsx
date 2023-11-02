"use client";
import { useContext, useEffect, useState } from "react";
import styles from "./page.module.css";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

function members() {
  const session = useSession();
  const [memberEmail, setMemberEmail] = useState("");
  const [membersList, setMembersList] = useState([])
  const { user } = useContext(UserContext);
  const router = useRouter();

//* Get existing members
  async function getMembers () {
      const res = await fetch(
      `http://localhost:3000/api/household/${user.households[0]}/members`
    );
    const data = await res.json()
    setMembersList(data.members)
  }

  useEffect(() => {
    getMembers()
  }, [])

//* Adding New Members
  async function AddMember(e) {
    e.preventDefault();
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

  //* Remove user from household
  async function removeMember (memberId) {
    try {
      const res = await fetch(
        `http://localhost:3000/api/household/${user.households[0]}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ memberId }),
        }
      );
      const response = await res.json()
      console.log(response);
    } catch (error) {
      console.error(error)
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
        <div className="main" >
          <form onSubmit={AddMember}>
            <input
              className={styles.input}
              type="email"
              placeholder="email"
              onChange={(e) => {
                setMemberEmail(e.target.value);
              }}
            />
            <button className={styles.button}>Add New Member</button>
          </form>
        <div>
              <ul>
                {membersList.map(member => {
                  return <li key={member._id}>
                    {member.email}
                    <button 
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      onClick={() => {removeMember(member._id)}}
                    >
                      Delete</button>
                  </li>
                })}
              </ul>
        </div>
        </div>
      </>
    );
  }
}

export default members;
