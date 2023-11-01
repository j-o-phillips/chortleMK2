"use client";

import ChoreCard from "@/components/ChoreCard/ChoreCard";
import style from "./page.module.css";
// import { useContext } from "react";
// import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

function Dashboard() {
  const session = useSession();
  const router = useRouter();

  if (session.status === "loading") {
    return <p>loading...</p>;
  }
  if (session.status === "unauthenticated") {
    router.push("/");
  }
  if (session.status === "authenticated") {
    return (
      <>
        <div className={style.page}>
          <h1 className={style.h1}>Chores</h1>
          <button className={style.newchore}>+</button>
          <div>
            <ChoreCard />
          </div>
        </div>
      </>
    );
  }
}

export default Dashboard;
