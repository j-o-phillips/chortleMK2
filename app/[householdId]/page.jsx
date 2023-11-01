"use client";

import ChoreCard from "@/components/ChoreCard/ChoreCard";
import style from './page.module.css'
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";


function Dashboard() { 
  const { user } = useContext(UserContext)
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

export default Dashboard;
