"use client";
import { useContext, useState } from "react";
import styles from "./page.module.css";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

function AddMember() {
  const session = useSession();
  const [memberEmail, setMemberEmail] = useState("");
  const { user } = useContext(UserContext);
  const router = useRouter();

  async function AddMember(e) {
    e.preventDefault();
    if (!memberEmail) {
      alert("Email required");
      return;
    }
    console.log(user);
    try {
      const res = await fetch(
        `http://localhost:3000/api/household/${user.households[0]}/addMember`,
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
        console.log(response);
        // await setHousehold(response.household);
        // router.push(`/${response.household._id}`);
      } else {
        throw new Error("Failed to add a new member");
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (session.status === "loading") {
    return <p>loading...</p>;
  }
  if (session.status === "unauthenticated") {
    router.push("/login");
  }
  if (session.status === "authenticated") {
    return (
      <div className={styles.container}>
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
      </div>
    );
  }
}

export default AddMember;
